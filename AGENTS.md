# Repository agent guidance

## Geometry changes

- Treat generated geometry as a visual deliverable, not only a data structure. Numeric/unit tests are necessary but do not prove that a tiling looks correct.
- After changing a tiling generator, renderer transforms, clipping, scaling, or tile-class assignment, run `npm run preview:geometry -- <tiling-id>`.
- Inspect the resulting PNG with a vision-capable image viewer and compare it with a cited reference image or construction diagram. Do not approve geometry from SVG/XML text or test counts alone.
- Check at least one landscape viewport and, when scale-dependent behavior is involved, a second tile size or viewport. Look for gaps, overlaps, seams, accidental periodicity, incorrect handedness, distorted prototiles, and misleading colour classes.
- Record the visual check and reference used in the commit or handoff. Keep generated previews out of version control.

The preview command renders SVG directly from the production generator and rasterizes it server-side with `rsvg-convert`, writing both formats to `/tmp/penrose-geometry-preview` by default. Set `GEOMETRY_PREVIEW_DIR` to retain the output elsewhere. The `GEOMETRY_PREVIEW_WIDTH`, `GEOMETRY_PREVIEW_HEIGHT`, `GEOMETRY_PREVIEW_TILE_SIZE`, and `GEOMETRY_PREVIEW_BORDER` environment variables reproduce scale-sensitive cases; set the border to `none` to check merged colour regions.
