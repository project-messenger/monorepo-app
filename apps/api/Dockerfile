FROM node:24.22.3-bookworm-slim AS build

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV HUSKY=0
ENV DO_NOT_TRACK=1
WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN --mount=type=cache,id=kan47-pnpm,target=/pnpm/store \
    pnpm --filter api... install --frozen-lockfile --store-dir /pnpm/store

COPY apps/api/ apps/api/
COPY packages/shared/ packages/shared/
RUN pnpm --filter api build
# The repository exposes shared as TypeScript. Ship compiled JS in the image,
# including enums, without depending on Node's experimental TS transforms.
RUN pnpm --filter @app/shared exec tsc \
    && node -e "const fs = require('node:fs'); const file = 'packages/shared/package.json'; const pkg = JSON.parse(fs.readFileSync(file)); pkg.main = './dist/index.js'; pkg.types = './dist/index.d.ts'; fs.writeFileSync(file, JSON.stringify(pkg));"
RUN --mount=type=cache,id=kan47-pnpm,target=/pnpm/store \
    pnpm --filter api --prod deploy /output --store-dir /pnpm/store --frozen-lockfile

FROM node:24.22.3-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=node:node /output/node_modules ./node_modules
COPY --from=build --chown=node:node /output/package.json ./package.json
COPY --from=build --chown=node:node /output/dist ./dist
USER node
EXPOSE 3001
CMD ["node", "dist/main.js"]
