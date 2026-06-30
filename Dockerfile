FROM node:22-alpine AS build

WORKDIR /app
ARG APP_VERSION=v0.01
ENV VITE_APP_VERSION=$APP_VERSION
ENV COREPACK_HOME=/tmp/corepack
ENV PNPM_HOME=/tmp/pnpm
ENV PNPM_STORE_DIR=/tmp/pnpm-store
ENV PATH=$PNPM_HOME:$PATH

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile --store-dir $PNPM_STORE_DIR

COPY index.html vite.config.js ./
COPY src ./src
RUN pnpm exec vite build

FROM nginx:1.27-alpine

COPY deploy/nginx-app.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
