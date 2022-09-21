# Stage 0 - Setup
FROM node:alpine3.11 as build-stage
ENV NODE_ENV=production
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production --ignore-scripts --prefer-offline
COPY index.js ./
CMD ["yarn", "start"]