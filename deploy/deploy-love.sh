#!/usr/bin/env bash
set -euo pipefail

APP_NAME="greenworld-love"
APP_DIR="${APP_DIR:-/opt/greenworld}"
APP_PORT="${APP_PORT:-18083}"
APP_VERSION="${APP_VERSION:-v0.01}"
DOMAIN="${DOMAIN:-www.greenworld.love}"
EXTRA_DOMAIN="${EXTRA_DOMAIN:-greenworld.love}"
REPO_URL="${REPO_URL:-https://github.com/hdp0207/greenworld.git}"
BRANCH="${BRANCH:-main}"

SUDO=""
if [ "$(id -u)" != "0" ]; then
  SUDO="sudo"
fi

if ! command -v git >/dev/null 2>&1; then
  echo "git is required on the server" >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required on the server" >&2
  exit 1
fi

if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  echo "docker compose is required on the server" >&2
  exit 1
fi

$SUDO mkdir -p "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  $SUDO git fetch origin "$BRANCH"
  $SUDO git reset --hard FETCH_HEAD
else
  $SUDO rm -rf "$APP_DIR"
  $SUDO git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi

cat > .env.love <<EOF
APP_VERSION=$APP_VERSION
APP_PORT=$APP_PORT
EOF

$SUDO $COMPOSE --env-file .env.love -f docker-compose.love.yml up -d --build

TMP_CONF="/tmp/${APP_NAME}.nginx.conf"
cat > "$TMP_CONF" <<EOF
server {
    listen 80;
    server_name $DOMAIN $EXTRA_DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \\$host;
        proxy_set_header X-Real-IP \\$remote_addr;
        proxy_set_header X-Forwarded-For \\$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \\$scheme;
    }
}
EOF

$SUDO mv "$TMP_CONF" "/etc/nginx/conf.d/${APP_NAME}.conf"
$SUDO nginx -t
if command -v systemctl >/dev/null 2>&1; then
  $SUDO systemctl reload nginx
else
  $SUDO nginx -s reload
fi

for attempt in $(seq 1 20); do
  if curl -fsS "http://127.0.0.1:$APP_PORT/" >/dev/null; then
    break
  fi
  if [ "$attempt" = "20" ]; then
    echo "health check failed after $attempt attempts" >&2
    exit 1
  fi
  sleep 2
done

echo "$APP_NAME $APP_VERSION deployed for $DOMAIN"
