# syntax=docker/dockerfile:1

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
COPY test ./test
RUN npm run typecheck && npm test && npx vite build

FROM nginx:1.29-alpine AS runtime

ARG OCI_CREATED
ARG OCI_SOURCE="https://gitea.wadas.dev/nuc/penrose-tilings"
ARG OCI_REVISION
ARG OCI_VERSION

LABEL org.opencontainers.image.title="penrose-tilings" \
  org.opencontainers.image.description="Interactive visualiser for Penrose and other aperiodic tilings, rendered as SVG" \
  org.opencontainers.image.source="${OCI_SOURCE}" \
  org.opencontainers.image.url="${OCI_SOURCE}" \
  org.opencontainers.image.revision="${OCI_REVISION}" \
  org.opencontainers.image.version="${OCI_VERSION}" \
  org.opencontainers.image.created="${OCI_CREATED}" \
  org.opencontainers.image.licenses="MIT"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
