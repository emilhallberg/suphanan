# Stage 0 - Setup
FROM node:21.4.0-alpine3.18 as build-stage
ENV NODE_ENV=production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --ignore-scripts --prefer-offline
COPY index.js ./
USER 1000
CMD ["yarn", "start"]