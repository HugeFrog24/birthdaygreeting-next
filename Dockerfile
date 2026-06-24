# Multi-platform build support (amd64, arm64)
# Build stage
FROM node:slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install the exact pnpm version pinned in package.json's "packageManager"
# field (node:slim no longer bundles corepack), instead of the latest pnpm.
RUN npm install -g pnpm@10.33.2 && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:slim AS runner

# Set to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create app directory
RUN mkdir -p /app/.next/static && chown -R nextjs:nodejs /app

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy static files to public directory for better performance
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./public/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]