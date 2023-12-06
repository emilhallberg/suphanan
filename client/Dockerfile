# Stage 0 - Building
FROM node:21.4.0-alpine3.18 as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN yarn build

# Stage 1 - Linting and formatting
FROM node:21.4.0-alpine3.18 as test-stage
WORKDIR /app
COPY --from=build-stage /app/ ./
RUN ["yarn", "lint"]

# Stage 2 - Production
FROM nginxinc/nginx-unprivileged:1.25-bookworm as prod-stage
COPY --from=build-stage /app/build/ /usr/share/nginx/html
