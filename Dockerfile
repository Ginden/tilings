# syntax=docker/dockerfile:1

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
COPY test ./test
COPY public ./public
COPY docs ./docs
RUN npm run typecheck && npm test && npx vite build

# Data-only OCI image. Kubernetes mounts the image root at the shared nginx
# document root, so index.html and assets must live directly at `/`.
FROM scratch AS site

ARG OCI_CREATED
ARG OCI_SOURCE="https://gitea.wadas.dev/nuc/penrose-tilings"
ARG OCI_REVISION
ARG OCI_VERSION

LABEL org.opencontainers.image.title="penrose-tilings" \
  org.opencontainers.image.description="Interactive visualiser for periodic and aperiodic tessellations, rendered as SVG" \
  org.opencontainers.image.source="${OCI_SOURCE}" \
  org.opencontainers.image.url="${OCI_SOURCE}" \
  org.opencontainers.image.revision="${OCI_REVISION}" \
  org.opencontainers.image.version="${OCI_VERSION}" \
  org.opencontainers.image.created="${OCI_CREATED}" \
  org.opencontainers.image.licenses="MIT"

COPY --from=build /app/dist/ /
