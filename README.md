# Greenworld Website

Greenworld 株式会社 corporate website.

## Version

Current application version: `v0.01`

The Docker build receives this as `APP_VERSION` and exposes it to the frontend through `VITE_APP_VERSION`.

## Local Development

```bash
pnpm install
pnpm exec vite --host 127.0.0.1
```

## Production Build

```bash
pnpm exec vite build
```

## Test Deployment

Test domain:

```text
greenworld.9881.net -> 8.213.129.168
```

The GitHub Actions workflow `.github/workflows/deploy-test.yml` deploys every push to `main`.

Required GitHub repository secrets:

```text
TEST_SERVER_SSH_KEY  # private key that can SSH into the test server
TEST_SERVER_USER     # optional, defaults to root
```

Deployment behavior:

- pulls `main` into `/opt/greenworld`
- builds and runs Docker Compose from `docker-compose.test.yml`
- exposes the app container on `127.0.0.1:18081`
- joins the existing external Docker network `web`
- writes a Traefik dynamic route when `/root/projects/traefik/dynamic` exists
- falls back to writing an Nginx virtual host if host Nginx is available

## greenworld.love Deployment

Production-style domain:

```text
www.greenworld.love -> 43.164.133.234
```

The GitHub Actions workflow `.github/workflows/deploy-love.yml` deploys every push to `main`.

Required GitHub repository secrets:

```text
GREENWORLD_LOVE_SSH_KEY      # private key that can SSH into 43.164.133.234
GREENWORLD_LOVE_SERVER_USER  # optional, defaults to root
```

Deployment behavior:

- pulls `main` into `/opt/greenworld`
- builds and runs Docker Compose from `docker-compose.love.yml`
- exposes the app container on `127.0.0.1:18083`
- writes an Nginx virtual host for `www.greenworld.love` and `greenworld.love`
