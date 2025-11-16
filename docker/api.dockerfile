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
# Copy root package files and backend workspace package
COPY apps/api/package.json apps/api/

# Install all dependencies (root + workspace)
RUN pnpm install --filter @sitecraft/api --frozen-lockfile

# Copy api
COPY apps/api/  apps/api/
COPY --from=package-builder /app/packages packages/

# Build api
RUN pnpm --filter @sitecraft/api build


# --- Stage 2: Production Stage ---
FROM base AS runner

# Copy only necessary files for backend runtime
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/

# Install only production deps for backend
RUN pnpm install --filter @sitecraft/api --prod --frozen-lockfile

# Copy built backend dist
COPY --from=builder /app/apps/api/dist apps/api/dist
COPY --from=builder /app/packages packages

WORKDIR /app/apps/api

EXPOSE 5000

CMD ["node", "dist/index.js"]
