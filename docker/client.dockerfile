FROM node:22.12.0-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@10.17.1
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

FROM base AS package-builder
COPY packages/ packages/
RUN apk update && apk add --no-cache openssl
RUN pnpm install --filter @sitecraft/db --filter @sitecraft/api-client --frozen-lockfile
RUN pnpm --filter @sitecraft/db generate
RUN pnpm --filter @sitecraft/api-client build

FROM base AS builder

ARG NEXT_PUBLIC_GOOGLE_TAG
ARG NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_DOMAIN
ARG NEXT_PUBLIC_S3_URL
ARG NEXT_PUBLIC_SERVER_IP
ARG NEXT_PUBLIC_DEBOUNCE_DELAY

ENV NEXT_PUBLIC_GOOGLE_TAG=$NEXT_PUBLIC_GOOGLE_TAG
ENV NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_DOMAIN=$NEXT_PUBLIC_BASE_DOMAIN
ENV NEXT_PUBLIC_S3_URL=$NEXT_PUBLIC_S3_URL
ENV NEXT_PUBLIC_SERVER_IP=$NEXT_PUBLIC_SERVER_IP
ENV NEXT_PUBLIC_DEBOUNCE_DELAY=$NEXT_PUBLIC_DEBOUNCE_DELAY

ENV COREPACK_DEFAULT_TO_LATEST=0

# Copy root package files and backend workspace package
COPY apps/client/package.json apps/client/

# Install all dependencies (root + workspace)
RUN pnpm install --filter @sitecraft/client --frozen-lockfile

# Copy api
COPY apps/client/  apps/client/
COPY --from=package-builder /app/packages packages/

# # Build api
RUN pnpm --filter @sitecraft/client build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/public ./apps/client/public

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node apps/client/server.js