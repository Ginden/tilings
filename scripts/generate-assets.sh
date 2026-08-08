#!/bin/sh
set -eu

project_dir="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

command -v rsvg-convert >/dev/null 2>&1 || {
  echo "rsvg-convert is required to generate raster assets" >&2
  exit 1
}

mkdir -p "$project_dir/public"

rsvg-convert --width 32 --height 32 \
  --output "$project_dir/public/favicon-32.png" \
  "$project_dir/public/favicon.svg"
rsvg-convert --width 180 --height 180 \
  --output "$project_dir/public/apple-touch-icon.png" \
  "$project_dir/public/favicon.svg"
rsvg-convert --width 900 --height 600 \
  --output "$project_dir/docs/preview.png" \
  "$project_dir/docs/preview.svg"
rsvg-convert --width 1200 --height 630 \
  --output "$project_dir/public/social-preview.png" \
  "$project_dir/docs/preview.svg"
