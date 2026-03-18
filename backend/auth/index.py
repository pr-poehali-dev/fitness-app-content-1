"""
Авторизация: register, login, logout, me.
Принимает POST с полем action: register | login | logout | me
"""
import json
import os
import hashlib
import secrets
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
    }


def ok(data: dict):
    return {"statusCode": 200, "headers": {**cors_headers(), "Content-Type": "application/json"}, "body": json.dumps(data, ensure_ascii=False)}


def err(msg: str, status: int = 400):
    return {"statusCode": status, "headers": {**cors_headers(), "Content-Type": "application/json"}, "body": json.dumps({"error": msg}, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    headers = event.get("headers", {}) or {}
    token = headers.get("X-Auth-Token", "")

    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    action = body.get("action", "me")

    # me — получить текущего пользователя
    if action == "me":
        if not token:
            return err("Не авторизован", 401)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT u.id, u.email, u.name, u.role, u.avatar_url FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = %s AND s.expires_at > now()",
            (token,)
        )
        row = cur.fetchone()
        conn.close()
        if not row:
            return err("Сессия истекла", 401)
        return ok({"id": str(row[0]), "email": row[1], "name": row[2], "role": row[3], "avatar_url": row[4]})

    # register
    if action == "register":
        email = body.get("email", "").strip().lower()
        name = body.get("name", "").strip()
        password = body.get("password", "")
        if not email or not name or not password:
            return err("Заполните все поля")
        if len(password) < 6:
            return err("Пароль минимум 6 символов")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            conn.close()
            return err("Email уже зарегистрирован")
        pw_hash = hash_password(password)
        cur.execute(
            "INSERT INTO users (email, name, password_hash, role) VALUES (%s, %s, %s, 'client') RETURNING id, role",
            (email, name, pw_hash)
        )
        user_id, role = cur.fetchone()
        new_token = secrets.token_hex(32)
        cur.execute("INSERT INTO sessions (user_id, token) VALUES (%s, %s)", (str(user_id), new_token))
        conn.commit()
        conn.close()
        return ok({"token": new_token, "user": {"id": str(user_id), "email": email, "name": name, "role": role}})

    # login
    if action == "login":
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")
        if not email or not password:
            return err("Введите email и пароль")
        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, name, role FROM users WHERE email = %s AND password_hash = %s", (email, pw_hash))
        row = cur.fetchone()
        if not row:
            conn.close()
            return err("Неверный email или пароль", 401)
        user_id, name, role = row
        new_token = secrets.token_hex(32)
        cur.execute("INSERT INTO sessions (user_id, token) VALUES (%s, %s)", (str(user_id), new_token))
        conn.commit()
        conn.close()
        return ok({"token": new_token, "user": {"id": str(user_id), "email": email, "name": name, "role": role}})

    # logout
    if action == "logout":
        if token:
            conn = get_conn()
            cur = conn.cursor()
            cur.execute("UPDATE sessions SET expires_at = now() WHERE token = %s", (token,))
            conn.commit()
            conn.close()
        return ok({"ok": True})

    return err("Неизвестное действие", 404)
