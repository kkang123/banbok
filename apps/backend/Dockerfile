# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY packages/*/package*.json ./packages/*/

# Install all dependencies including devDependencies for build
RUN npm install && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build only backend and its dependencies using npx
WORKDIR /app
RUN npx turbo run build --filter=backend -- --verbose

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy necessary files
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/package*.json ./
COPY --from=deps /app/node_modules ./node_modules

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

EXPOSE 3001

ENV NODE_ENV=production

CMD ["node", "dist/main"]