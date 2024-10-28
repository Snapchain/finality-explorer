# Step 1. Rebuild the source code only when needed
FROM node:22-alpine3.19 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
# Install dependencies with npm
RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.js .

EXPOSE 13000

COPY entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]
