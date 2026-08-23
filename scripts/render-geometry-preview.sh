#!/usr/bin/env bash
set -euo pipefail

tiling_id="${1:-}"
preview_dir="${GEOMETRY_PREVIEW_DIR:-/tmp/penrose-geometry-preview}"

if ! command -v rsvg-convert >/dev/null 2>&1; then
  echo "rsvg-convert is required (provided by librsvg)." >&2
  exit 1
fi

mkdir -p "$preview_dir"
PREVIEW_DIR="$preview_dir" \
PREVIEW_TILING="$tiling_id" \
PREVIEW_WIDTH="${GEOMETRY_PREVIEW_WIDTH:-900}" \
PREVIEW_HEIGHT="${GEOMETRY_PREVIEW_HEIGHT:-600}" \
PREVIEW_TILE_SIZE="${GEOMETRY_PREVIEW_TILE_SIZE:-34}" \
PREVIEW_ROTATION="${GEOMETRY_PREVIEW_ROTATION:-0}" \
PREVIEW_HIERARCHY="${GEOMETRY_PREVIEW_HIERARCHY:-0}" \
PREVIEW_COLOUR_1="${GEOMETRY_PREVIEW_COLOUR_1:-#f2c14e}" \
PREVIEW_COLOUR_2="${GEOMETRY_PREVIEW_COLOUR_2:-#1b3a5c}" \
PREVIEW_COLOUR_3="${GEOMETRY_PREVIEW_COLOUR_3:-}" \
PREVIEW_BORDER="${GEOMETRY_PREVIEW_BORDER:-#101820}" \
PREVIEW_BORDER_WIDTH="${GEOMETRY_PREVIEW_BORDER_WIDTH:-1}" \
npm exec vitest run test/preview.test.ts

found=0
for source in "$preview_dir"/*.svg; do
  [[ -e "$source" ]] || continue
  found=1
  target="${source%.svg}.png"
  rsvg-convert --background-color white --output "$target" "$source"
  echo "$target"
done

if [[ "$found" -eq 0 ]]; then
  echo "No geometry previews were rendered." >&2
  exit 1
fi
