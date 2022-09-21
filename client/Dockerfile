# Stage 0 - Building
FROM node:alpine3.11 as build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN yarn build

# Stage 1 - Linting and formatting
FROM node:alpine3.11 as test-stage
WORKDIR /app
COPY --from=build-stage /app/ ./
RUN ["yarn", "lint:check"]
RUN ["yarn", "format:check"]
RUN ["yarn", "test"]

# Stage 2 - Production
FROM nginx:1.18.0-alpine as prod-stage
COPY --from=build-stage /app/build/ /var/www/html
COPY nginx.conf /etc/nginx/temp/

CMD ["/bin/sh", "-c", "PORT=${PORT:-80} envsubst '$PORT $API_SERVER' < /etc/nginx/temp/nginx.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
