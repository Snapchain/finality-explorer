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
COPY .env.example ./.env
# Replace the variables in the .env file
ARG NEXT_PUBLIC_FINALITY_GADGET_API_URL
ARG NEXT_PUBLIC_DISPLAY_TESTING_MESSAGES
RUN sed -i "s|NEXT_PUBLIC_FINALITY_GADGET_API_URL=.*|NEXT_PUBLIC_FINALITY_GADGET_API_URL=${NEXT_PUBLIC_FINALITY_GADGET_API_URL}|g" .env
RUN sed -i "s|NEXT_PUBLIC_DISPLAY_TESTING_MESSAGES=.*|NEXT_PUBLIC_DISPLAY_TESTING_MESSAGES=${NEXT_PUBLIC_DISPLAY_TESTING_MESSAGES}|g" .env

RUN npm run build

# Step 2. Production image, copy all the files and run next
FROM node:22-alpine3.19 AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the .env file
COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env

RUN chown -R nextjs:nodejs .

USER nextjs

# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]
STOPSIGNAL SIGTERM
