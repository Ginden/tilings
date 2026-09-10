# Seeded tiling performance follow-up

2026-09-11. This supplements the original `report.md`; its original measurements are retained.

At 1920×1080, 34 px tiles, 1 px borders, seed 20260824:

| Tiling | Before median ms | After median ms | Speedup |
| --- | ---: | ---: | ---: |
| Seeded binary-tree maze | 49.940 | 24.597 | 2.0× |
| Seeded Delaunay triangulation | 1020.395 | 58.833 | 17.3× |
| Seeded quadtree mosaic | 5.984 | 5.585 | 1.1× |
| Seeded Truchet mosaic | 108.721 | 45.162 | 2.4× |
| Seeded Voronoi mosaic | 649.785 | 107.140 | 6.1× |

Before: 1 warmup, 3 measured renders on the unchanged checkout. After: 2 warmups, 5 measured renders on the same machine. These are full synchronous SVG renders, with no new geometry cache. Browser painting, worker messaging and PNG rasterization are excluded. Quadtree is unchanged; its small timing difference is noise.

Changes:

- Voronoi cells use nearby sites to bound the relevant bisectors, then clip in deterministic site order. Delaunay skips cells whose bounding square cannot reach the output.
- Four-colour repair expands its neighbourhood after 2,000 search attempts instead of exhausting a constrained small region. Two-colour component swaps precede the existing full-graph fallback. This is a practical improvement, not a worst-case runtime guarantee for arbitrary graph colouring. Difficult repairs can choose different colours than the previous search.
- Maze corridor boundaries are translated from sixteen precomputed shapes.
- Truchet reuses four arc templates and a proven half-loop-length discovery halo. Explicit border polylines remain connected in SVG, reducing the 1080p/34px Truchet SVG from 903.7 to 534.8 KiB. Round joins preserve the geometry; raster antialiasing can differ slightly from separate round-capped segments.

Dense exports remain expensive: 1080p/10px Voronoi renders took 1.14–1.20 seconds for seeds 0, 1, 20260824 and 4294967295 (single cold renders). The seed-20260824 4K/10px case took 4.47 seconds. Truchet medians at 10px were 627 ms for 1080p and 2.44 seconds for 4K (1 warmup, 3 runs), versus 3.54 seconds for 4K in the original report. These uncapped 4K scenes contain about 84,000 visible tiles; the UI caps its estimated tile count at 30,000.

Validation: `npm test` passed 268 tests (the opt-in preview test was skipped); `npm run build` passed. A new dense Voronoi regression checks valid four-colour assignment and different colours across shared borders at radius 120, where the smaller existing performance case missed the stalled repair.

Visual review used production `preview:geometry` PNGs for Voronoi, Delaunay, Truchet and maze at 900×600: 34px/0°/1px borders, and 68px/27°/6px borders, seed 20260824. Checked coverage, shared boundaries, triangle shapes, map colours, quarter-circle continuity and maze passages. The unrotated Voronoi, Delaunay and maze PNGs match the pre-change images pixel-for-pixel; Truchet differs only along antialiased strokes. No gaps, overlaps or new periodic patterns were visible. Previews remain outside version control in `/tmp/seeded-final` and `/tmp/seeded-final-68`.

Reference diagrams inspected: [Euclidean Voronoi cells](https://commons.wikimedia.org/wiki/File:Euclidean_Voronoi_diagram.svg), [Delaunay/Voronoi dual](https://commons.wikimedia.org/wiki/File:Delaunay_Voronoi.svg), and [quarter-circle Truchet tiling](https://commons.wikimedia.org/wiki/File:Truchet_tiling.svg). Maze output was compared with the pre-change PNG and checked against [Buck’s binary-tree construction](https://weblog.jamisbuck.org/2011/2/1/maze-generation-binary-tree-algorithm).

Reproduce the following focused report:

```sh
npm run --silent report:performance -- \
  --tilings seeded-binary-tree-maze,seeded-delaunay,seeded-quadtree,seeded-truchet,seeded-voronoi \
  --sizes 900x600,1920x1080,3840x2160 --tile-size 34 \
  --border-width 1 --runs 5 --warmup 2
```

## Measured results

2026-09-10T22:28:47.299Z · Node v24.19.0 · linux/x64 · AMD Ryzen 9 5950X 16-Core Processor

5 tilings × 3 setting combinations = 15 benchmark rows.
2 warmup renders and 5 measured renders per combination, run sequentially in one process.
Times cover synchronous production SVG generation, including geometry, clipping and serialization where applicable.
Module loading, browser painting, worker messaging and PNG rasterization are excluded.
Colours: #f2c14e / #1b3a5c; border: #101820 when enabled.
Hierarchy is the requested level count; unsupported settings are ignored or clamped by the production renderer.
Periodic tile counts are viewport estimates; patch counts are retained tiles after clipping.
The renderer is called directly, without the UI's tile-count cap. Caches and normal garbage collection remain enabled.
Median averages the two central samples for even run counts; p95 uses nearest rank.

| Tiling | ID | Viewport | Tile px | Rotation ° | Hierarchy | Loop limit | Border px | Seed | Render path | Tiles | SVG KiB | Median ms | p95 ms |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 504 | 108.5 | 8.959 | 12.148 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 423.9 | 24.597 | 39.410 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7296 | 1777.8 | 98.201 | 133.614 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 550 | 45.5 | 22.362 | 24.497 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1943 | 165.9 | 58.833 | 59.753 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7467 | 666.6 | 195.262 | 214.259 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 577 | 71.4 | 1.768 | 3.935 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2071 | 266.2 | 5.585 | 10.759 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7735 | 1053.0 | 28.422 | 39.455 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 506 | 135.9 | 14.592 | 22.019 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1862 | 534.8 | 45.162 | 51.236 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7310 | 2183.4 | 175.589 | 198.502 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 526 | 87.0 | 32.604 | 33.863 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1912 | 326.3 | 107.140 | 116.297 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7359 | 1310.9 | 367.999 | 412.981 |
