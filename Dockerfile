FROM node:22-alpine AS build

WORKDIR /app
ARG APP_VERSION=v0.01
ENV VITE_APP_VERSION=$APP_VERSION
COPY package.json ./
RUN npm install

COPY index.html vite.config.js ./
COPY src ./src
RUN npm run build

FROM nginx:1.27-alpine

COPY deploy/nginx-app.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
