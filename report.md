# Tiling performance report

Seeded performance fixes and follow-up measurements: [report-seeded.md](report-seeded.md).

2026-09-10T21:03:47.921Z · Node v24.19.0 · linux/x64 · AMD Ryzen 9 5950X 16-Core Processor

42 tilings × 36 setting combinations = 1512 benchmark rows.
2 warmup renders and 10 measured renders per combination, run sequentially in one process.
Times cover synchronous production SVG generation, including geometry, clipping and serialization where applicable.
Module loading, browser painting, worker messaging and PNG rasterization are excluded.
Colours: #f2c14e / #1b3a5c; border: #101820 when enabled.
Hierarchy is the requested level count; unsupported settings are ignored or clamped by the production renderer.
Periodic tile counts are viewport estimates; patch counts are retained tiles after clipping.
The renderer is called directly, without the UI's tile-count cap. Caches and normal garbage collection remain enabled.
Median averages the two central samples for even run counts; p95 uses nearest rank.

| Tiling | ID | Viewport | Tile px | Rotation ° | Hierarchy | Loop limit | Border px | Seed | Render path | Tiles | SVG KiB | Median ms | p95 ms |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5595 | 300.1 | 42.778 | 51.221 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5595 | 600.6 | 43.188 | 48.511 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5595 | 600.6 | 40.646 | 54.260 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5595 | 600.6 | 42.654 | 50.475 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 524 | 28.4 | 2.976 | 5.671 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 524 | 57.4 | 3.425 | 9.337 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 524 | 57.4 | 3.342 | 11.718 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 524 | 57.4 | 3.360 | 10.272 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 156 | 8.7 | 0.543 | 0.585 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 156 | 17.7 | 0.762 | 0.774 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 156 | 17.7 | 0.765 | 7.441 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 156 | 17.7 | 0.772 | 0.803 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21148 | 1191.6 | 144.587 | 156.698 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21148 | 2376.8 | 199.716 | 221.367 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21148 | 2376.8 | 219.416 | 265.263 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21148 | 2376.8 | 203.125 | 250.476 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1938 | 109.5 | 9.399 | 20.024 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1938 | 220.1 | 12.424 | 15.878 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1938 | 220.1 | 11.295 | 13.156 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1938 | 220.1 | 12.901 | 16.436 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 503 | 28.4 | 2.589 | 3.105 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 503 | 57.8 | 3.460 | 4.726 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 503 | 57.8 | 3.252 | 3.914 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 503 | 57.8 | 3.310 | 4.854 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83438 | 4950.3 | 680.660 | 756.607 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83438 | 9853.4 | 926.936 | 1002.420 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83438 | 9853.4 | 925.406 | 967.644 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83438 | 9853.4 | 900.972 | 917.495 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7396 | 439.6 | 48.637 | 59.513 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7396 | 879.6 | 58.647 | 86.065 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7396 | 879.6 | 53.987 | 65.090 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7396 | 879.6 | 47.979 | 55.780 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1938 | 114.7 | 8.684 | 9.876 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1938 | 230.5 | 11.363 | 14.675 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1938 | 230.5 | 11.617 | 13.288 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1938 | 230.5 | 11.399 | 14.969 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5644 | 300.3 | 36.075 | 39.789 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5644 | 600.3 | 47.886 | 53.712 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5644 | 600.3 | 46.261 | 57.795 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5644 | 600.3 | 47.177 | 58.198 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 524 | 28.5 | 2.380 | 8.130 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 524 | 57.8 | 3.119 | 7.738 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 524 | 57.8 | 3.110 | 8.918 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 524 | 57.8 | 3.071 | 8.132 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 155 | 8.5 | 0.893 | 0.960 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 155 | 17.3 | 1.072 | 1.121 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 155 | 17.3 | 1.112 | 1.226 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 155 | 17.3 | 1.069 | 1.112 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21296 | 1191.4 | 165.194 | 182.188 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21296 | 2375.6 | 199.304 | 235.738 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21296 | 2375.6 | 185.738 | 212.552 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21296 | 2375.6 | 193.156 | 204.485 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1924 | 108.2 | 10.328 | 18.013 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1924 | 217.2 | 13.578 | 33.828 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1924 | 217.2 | 12.032 | 13.313 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1924 | 217.2 | 12.379 | 15.690 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 539 | 30.6 | 2.114 | 3.500 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 539 | 62.0 | 2.873 | 3.398 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 539 | 62.0 | 2.872 | 3.426 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 539 | 62.0 | 2.870 | 3.292 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83931 | 4973.0 | 580.151 | 627.663 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83931 | 9901.4 | 767.940 | 887.901 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83931 | 9901.4 | 805.841 | 975.267 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83931 | 9901.4 | 754.704 | 828.345 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7346 | 434.4 | 41.068 | 65.423 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7346 | 868.7 | 54.034 | 56.640 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7346 | 868.7 | 54.941 | 60.895 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7346 | 868.7 | 53.642 | 57.673 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1924 | 113.6 | 8.639 | 10.734 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1924 | 228.0 | 11.756 | 14.192 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1924 | 228.0 | 12.915 | 23.924 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1924 | 228.0 | 12.743 | 14.896 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5531 | 387.3 | 25.955 | 28.876 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5531 | 776.8 | 34.137 | 36.291 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5531 | 776.8 | 37.343 | 43.731 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5531 | 776.8 | 34.606 | 42.987 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 533 | 37.7 | 2.235 | 6.001 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 533 | 76.7 | 3.195 | 7.622 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 533 | 76.7 | 3.195 | 7.776 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 533 | 76.7 | 3.309 | 8.136 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 150 | 11.4 | 1.000 | 5.443 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 150 | 23.2 | 1.283 | 1.540 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 150 | 23.2 | 1.319 | 6.108 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 150 | 23.2 | 1.263 | 1.310 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21167 | 1554.8 | 89.133 | 114.001 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21167 | 3107.8 | 144.956 | 175.169 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21167 | 3107.8 | 139.085 | 178.999 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21167 | 3107.8 | 147.723 | 165.810 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1889 | 140.1 | 8.102 | 12.945 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1889 | 282.0 | 12.431 | 17.738 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1889 | 282.0 | 13.404 | 20.611 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1889 | 282.0 | 13.025 | 24.293 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 521 | 38.9 | 2.230 | 3.476 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 521 | 79.0 | 3.228 | 4.207 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 521 | 79.0 | 3.243 | 3.735 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 521 | 79.0 | 3.226 | 3.953 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83834 | 6486.5 | 350.360 | 404.537 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83834 | 12937.6 | 610.238 | 637.341 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83834 | 12937.6 | 601.147 | 683.868 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83834 | 12937.6 | 610.759 | 681.948 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7428 | 577.6 | 30.026 | 31.826 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7428 | 1158.4 | 46.592 | 51.709 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7428 | 1158.4 | 47.801 | 49.402 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7428 | 1158.4 | 47.373 | 50.695 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1889 | 147.5 | 7.660 | 9.298 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1889 | 297.1 | 11.472 | 12.222 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1889 | 297.1 | 11.122 | 12.058 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1889 | 297.1 | 11.300 | 12.158 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5364 | 286.0 | 13.202 | 42.783 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5364 | 572.4 | 17.548 | 19.678 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5364 | 572.4 | 17.363 | 19.214 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5364 | 572.4 | 17.612 | 18.288 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 515 | 28.1 | 0.929 | 1.735 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 515 | 57.2 | 1.683 | 2.048 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 515 | 57.2 | 1.682 | 1.730 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 515 | 57.2 | 1.690 | 1.947 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 137 | 7.7 | 0.387 | 0.869 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 137 | 15.8 | 0.584 | 0.663 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 137 | 15.8 | 0.611 | 0.739 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 137 | 15.8 | 0.639 | 1.187 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 20181 | 1131.6 | 47.073 | 63.827 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 20181 | 2258.0 | 107.981 | 117.121 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 20181 | 2258.0 | 101.298 | 130.217 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 20181 | 2258.0 | 102.138 | 123.954 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1791 | 101.3 | 3.011 | 3.961 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1791 | 203.8 | 5.574 | 6.988 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1791 | 203.8 | 5.831 | 6.674 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1791 | 203.8 | 5.824 | 6.382 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 482 | 27.6 | 0.884 | 1.560 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 482 | 56.0 | 1.584 | 1.602 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 482 | 56.0 | 1.588 | 1.660 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 482 | 56.0 | 1.605 | 2.135 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 79348 | 4714.9 | 195.614 | 228.593 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 79348 | 9386.9 | 471.127 | 501.789 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 79348 | 9386.9 | 435.929 | 491.463 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 79348 | 9386.9 | 427.042 | 483.742 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7067 | 420.5 | 11.550 | 12.870 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7067 | 842.0 | 24.456 | 26.152 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7067 | 842.0 | 24.443 | 26.708 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7067 | 842.0 | 24.172 | 26.258 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1791 | 107.0 | 2.649 | 17.081 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1791 | 215.3 | 5.373 | 6.669 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1791 | 215.3 | 5.403 | 5.957 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1791 | 215.3 | 5.412 | 5.961 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5674 | 229.6 | 5.847 | 7.293 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5674 | 457.2 | 12.990 | 13.980 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5674 | 457.2 | 12.735 | 13.981 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5674 | 457.2 | 12.492 | 13.778 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 560 | 22.7 | 0.654 | 1.930 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 560 | 45.6 | 1.223 | 1.323 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 560 | 45.6 | 1.217 | 1.675 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 560 | 45.6 | 1.229 | 1.240 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 158 | 6.5 | 0.232 | 0.241 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 158 | 13.2 | 0.388 | 0.404 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 158 | 13.2 | 0.386 | 0.391 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 158 | 13.2 | 0.383 | 0.400 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21228 | 899.7 | 38.700 | 49.004 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21228 | 1786.6 | 73.147 | 83.613 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21228 | 1786.6 | 69.998 | 79.430 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21228 | 1786.6 | 69.741 | 76.862 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 81.8 | 1.971 | 3.583 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 163.5 | 4.337 | 5.080 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 163.5 | 4.217 | 4.995 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 163.5 | 4.175 | 4.868 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 514 | 22.0 | 0.665 | 1.263 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 514 | 44.1 | 1.214 | 1.226 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 514 | 44.1 | 1.233 | 1.745 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 514 | 44.1 | 1.216 | 1.262 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83764 | 3742.3 | 155.219 | 191.687 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83764 | 7428.3 | 296.193 | 341.964 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83764 | 7428.3 | 296.090 | 340.612 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83764 | 7428.3 | 289.607 | 335.530 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7490 | 334.5 | 11.216 | 30.819 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7490 | 666.9 | 19.994 | 23.307 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7490 | 666.9 | 20.208 | 21.028 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7490 | 666.9 | 20.102 | 22.556 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 86.2 | 2.003 | 2.811 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 172.4 | 4.502 | 6.225 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 172.4 | 4.425 | 5.230 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 172.4 | 5.149 | 5.860 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5836 | 308.5 | 10.292 | 12.047 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5836 | 617.7 | 20.593 | 24.665 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5836 | 617.7 | 22.528 | 29.740 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5836 | 617.7 | 23.318 | 28.660 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 521 | 28.1 | 0.814 | 1.642 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 521 | 57.1 | 1.516 | 2.214 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 521 | 57.1 | 1.525 | 1.645 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 521 | 57.1 | 1.540 | 1.840 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 141 | 7.7 | 0.319 | 0.772 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 141 | 15.7 | 0.538 | 0.589 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 141 | 15.7 | 0.547 | 0.692 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 141 | 15.7 | 0.495 | 0.992 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21892 | 1217.1 | 46.653 | 59.809 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21892 | 2428.0 | 101.182 | 119.273 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21892 | 2428.0 | 97.751 | 116.920 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21892 | 2428.0 | 100.040 | 114.519 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1945 | 109.7 | 2.502 | 3.332 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1945 | 220.3 | 5.551 | 6.290 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1945 | 220.3 | 5.522 | 6.452 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1945 | 220.3 | 5.604 | 6.870 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 502 | 28.3 | 0.772 | 1.374 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 502 | 57.4 | 1.492 | 1.983 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 502 | 57.4 | 1.501 | 2.049 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 502 | 57.4 | 1.496 | 1.569 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 86320 | 5077.2 | 189.484 | 246.997 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 86320 | 10109.3 | 465.022 | 523.028 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 86320 | 10109.3 | 488.294 | 526.708 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 86320 | 10109.3 | 472.571 | 558.817 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7661 | 452.4 | 12.649 | 14.801 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7661 | 904.4 | 26.748 | 29.773 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7661 | 904.4 | 26.917 | 29.496 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7661 | 904.4 | 28.470 | 33.249 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1945 | 115.3 | 2.634 | 6.051 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1945 | 231.7 | 5.799 | 6.701 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1945 | 231.7 | 5.981 | 7.679 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1945 | 231.7 | 6.185 | 8.217 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5543 | 297.4 | 10.907 | 12.720 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5543 | 595.0 | 21.782 | 45.012 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5543 | 595.0 | 22.559 | 26.125 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5543 | 595.0 | 22.540 | 25.950 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 526 | 28.4 | 1.189 | 1.700 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 526 | 57.8 | 1.991 | 2.614 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 526 | 57.8 | 1.833 | 2.399 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 526 | 57.8 | 1.831 | 2.239 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 144 | 8.1 | 0.443 | 0.456 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 144 | 16.4 | 0.641 | 0.652 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 144 | 16.4 | 0.644 | 1.040 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 144 | 16.4 | 0.635 | 0.647 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 20694 | 1164.5 | 48.465 | 61.028 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 20694 | 2322.0 | 100.999 | 116.921 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 20694 | 2322.0 | 101.618 | 116.365 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 20694 | 2322.0 | 100.019 | 107.300 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1876 | 105.5 | 3.550 | 6.945 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1876 | 212.3 | 6.158 | 7.498 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1876 | 212.3 | 6.121 | 7.063 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1876 | 212.3 | 6.013 | 6.868 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 492 | 28.2 | 1.053 | 1.617 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 492 | 57.0 | 1.791 | 2.169 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 492 | 57.0 | 1.802 | 2.293 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 492 | 57.0 | 1.779 | 2.458 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 82322 | 4888.2 | 201.172 | 253.577 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 82322 | 9732.8 | 453.369 | 503.598 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 82322 | 9732.8 | 475.284 | 536.423 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 82322 | 9732.8 | 467.838 | 550.142 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7238 | 429.0 | 13.720 | 17.240 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7238 | 858.2 | 27.792 | 31.946 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7238 | 858.2 | 28.482 | 31.354 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7238 | 858.2 | 28.370 | 37.285 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1876 | 111.8 | 3.242 | 5.801 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1876 | 225.0 | 6.574 | 7.564 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1876 | 225.0 | 6.339 | 7.635 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1876 | 225.0 | 6.274 | 7.345 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5162 | 276.4 | 12.036 | 15.393 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5162 | 553.1 | 19.278 | 22.814 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5162 | 553.1 | 18.708 | 20.933 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5162 | 553.1 | 19.098 | 41.226 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 481 | 26.1 | 1.276 | 2.931 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 481 | 52.8 | 1.962 | 2.442 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 481 | 52.8 | 2.169 | 2.619 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 481 | 52.8 | 2.202 | 2.797 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 138 | 7.7 | 0.572 | 0.593 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 138 | 15.7 | 0.979 | 1.084 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 138 | 15.7 | 0.757 | 1.055 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 138 | 15.7 | 0.753 | 0.758 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 19305 | 1083.5 | 49.603 | 72.401 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 19305 | 2160.6 | 96.037 | 116.658 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 19305 | 2160.6 | 100.823 | 127.336 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 19305 | 2160.6 | 98.012 | 105.193 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1750 | 98.9 | 3.738 | 4.694 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1750 | 198.9 | 6.407 | 7.821 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1750 | 198.9 | 6.202 | 7.062 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1750 | 198.9 | 7.098 | 7.899 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 471 | 26.6 | 1.211 | 1.224 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 471 | 53.9 | 1.908 | 1.931 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 471 | 53.9 | 1.902 | 1.930 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 471 | 53.9 | 1.904 | 1.923 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 76598 | 4539.0 | 209.838 | 265.098 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 76598 | 9037.6 | 441.453 | 488.799 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 76598 | 9037.6 | 495.701 | 519.996 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 76598 | 9037.6 | 459.684 | 505.257 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 6827 | 405.8 | 14.617 | 15.726 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 6827 | 812.3 | 27.700 | 31.041 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 6827 | 812.3 | 27.016 | 45.283 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 6827 | 812.3 | 27.200 | 28.556 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1750 | 104.1 | 3.295 | 5.914 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1750 | 209.5 | 6.289 | 7.111 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1750 | 209.5 | 6.213 | 7.192 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1750 | 209.5 | 6.534 | 7.342 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5150 | 276.2 | 13.782 | 16.824 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5150 | 552.4 | 23.093 | 25.643 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5150 | 552.4 | 22.946 | 24.708 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5150 | 552.4 | 23.013 | 36.129 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 503 | 27.6 | 1.983 | 2.321 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 503 | 55.8 | 2.708 | 3.100 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 503 | 55.8 | 2.700 | 3.058 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 503 | 55.8 | 2.706 | 3.123 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 137 | 7.9 | 1.043 | 1.436 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 137 | 16.0 | 1.227 | 1.239 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 137 | 16.0 | 1.227 | 1.230 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 137 | 16.0 | 1.231 | 1.600 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 19548 | 1101.7 | 55.986 | 80.873 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 19548 | 2197.4 | 99.140 | 122.628 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 19548 | 2197.4 | 104.109 | 123.426 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 19548 | 2197.4 | 102.808 | 118.785 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1754 | 99.2 | 4.924 | 6.029 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1754 | 199.6 | 7.786 | 8.481 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1754 | 199.6 | 7.790 | 8.259 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1754 | 199.6 | 7.871 | 8.952 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 473 | 27.3 | 1.972 | 2.002 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 473 | 55.1 | 2.681 | 2.961 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 473 | 55.1 | 2.684 | 3.088 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 473 | 55.1 | 2.701 | 3.295 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 77496 | 4604.2 | 227.772 | 278.668 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 77496 | 9167.4 | 457.683 | 501.396 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 77496 | 9167.4 | 458.412 | 491.342 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 77496 | 9167.4 | 486.931 | 525.087 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 6834 | 406.0 | 18.895 | 22.529 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 6834 | 812.1 | 32.346 | 34.337 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 6834 | 812.1 | 32.532 | 37.089 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 6834 | 812.1 | 31.921 | 33.333 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1754 | 104.8 | 4.726 | 5.561 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1754 | 210.8 | 7.678 | 8.497 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1754 | 210.8 | 7.705 | 8.546 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1754 | 210.8 | 7.670 | 8.503 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5720 | 314.7 | 38.802 | 41.823 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5720 | 629.8 | 49.569 | 52.559 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5720 | 629.8 | 49.110 | 51.652 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5720 | 629.8 | 48.831 | 71.973 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 541 | 30.1 | 3.981 | 6.010 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 541 | 61.0 | 4.780 | 5.306 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 541 | 61.0 | 4.783 | 5.401 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 541 | 61.0 | 4.755 | 5.247 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 148 | 8.6 | 1.384 | 1.394 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 148 | 17.4 | 1.596 | 1.960 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 148 | 17.4 | 1.607 | 2.013 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 148 | 17.4 | 1.601 | 1.615 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21588 | 1247.1 | 170.570 | 185.171 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21588 | 2487.8 | 217.499 | 246.352 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21588 | 2487.8 | 221.942 | 246.884 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21588 | 2487.8 | 227.735 | 250.612 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1923 | 111.6 | 13.940 | 14.608 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1923 | 224.6 | 16.894 | 18.283 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1923 | 224.6 | 16.999 | 18.613 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1923 | 224.6 | 16.710 | 18.385 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 535 | 31.4 | 4.170 | 5.165 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 535 | 63.9 | 5.016 | 5.711 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 535 | 63.9 | 5.066 | 5.625 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 535 | 63.9 | 5.582 | 6.740 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 85325 | 5208.9 | 782.403 | 816.680 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 85325 | 10373.4 | 1094.984 | 1184.061 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 85325 | 10373.4 | 1071.702 | 1154.727 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 85325 | 10373.4 | 1050.118 | 1129.433 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7584 | 460.9 | 58.043 | 64.679 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7584 | 921.8 | 71.623 | 90.410 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7584 | 921.8 | 73.119 | 85.103 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7584 | 921.8 | 76.413 | 86.079 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1923 | 118.3 | 13.695 | 15.275 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1923 | 238.2 | 16.607 | 17.754 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1923 | 238.2 | 17.015 | 20.818 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1923 | 238.2 | 17.590 | 19.327 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5674 | 229.7 | 7.298 | 11.231 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5674 | 457.4 | 14.093 | 15.211 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5674 | 457.4 | 13.932 | 14.615 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5674 | 457.4 | 14.082 | 15.331 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 560 | 22.9 | 0.807 | 1.160 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 560 | 45.8 | 1.395 | 1.493 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 560 | 45.8 | 1.416 | 1.843 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 560 | 45.8 | 1.350 | 1.599 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 158 | 6.7 | 0.271 | 0.616 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 158 | 13.4 | 0.430 | 0.445 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 158 | 13.4 | 0.434 | 0.444 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 158 | 13.4 | 0.436 | 0.575 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21228 | 899.9 | 57.402 | 76.482 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21228 | 1786.8 | 86.702 | 98.604 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21228 | 1786.8 | 88.367 | 107.226 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21228 | 1786.8 | 85.794 | 103.630 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 82.0 | 2.169 | 5.446 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 163.7 | 4.427 | 6.252 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 163.7 | 4.352 | 5.056 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 163.7 | 4.339 | 5.169 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 514 | 22.2 | 0.739 | 1.391 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 514 | 44.3 | 1.296 | 1.518 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 514 | 44.3 | 1.290 | 1.719 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 514 | 44.3 | 1.290 | 1.812 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83764 | 3742.5 | 186.544 | 231.801 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83764 | 7428.4 | 336.937 | 372.195 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83764 | 7428.4 | 324.860 | 355.816 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83764 | 7428.4 | 328.551 | 366.311 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7490 | 334.6 | 19.790 | 23.323 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7490 | 667.1 | 28.133 | 31.171 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7490 | 667.1 | 28.648 | 42.302 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7490 | 667.1 | 27.749 | 38.591 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 86.4 | 2.098 | 4.951 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 172.6 | 4.420 | 5.035 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 172.6 | 4.422 | 5.081 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 172.6 | 4.387 | 5.099 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5604 | 960.6 | 29.443 | 38.779 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5604 | 2041.6 | 62.327 | 72.250 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5604 | 2041.6 | 61.295 | 73.430 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5604 | 2041.6 | 66.323 | 78.803 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 526 | 91.2 | 2.211 | 10.327 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 526 | 196.4 | 4.873 | 12.629 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 526 | 196.4 | 4.450 | 10.563 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 526 | 196.4 | 4.502 | 11.300 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 148 | 26.0 | 0.947 | 1.453 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 148 | 56.7 | 1.391 | 8.279 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 148 | 56.7 | 1.416 | 1.592 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 148 | 56.7 | 1.459 | 8.437 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21164 | 3817.4 | 142.408 | 179.775 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21164 | 8088.9 | 299.444 | 354.727 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21164 | 8088.9 | 288.601 | 326.200 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21164 | 8088.9 | 291.015 | 304.818 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1921 | 348.1 | 8.291 | 15.995 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1921 | 744.0 | 19.519 | 34.163 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1921 | 744.0 | 18.850 | 20.837 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1921 | 744.0 | 17.923 | 21.222 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 512 | 93.4 | 2.059 | 3.186 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 512 | 201.3 | 4.393 | 5.436 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 512 | 201.3 | 4.401 | 6.014 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 512 | 201.3 | 4.388 | 5.303 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83823 | 15989.5 | 580.927 | 742.664 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83823 | 33818.1 | 1284.051 | 1372.102 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83823 | 33818.1 | 1297.804 | 1382.567 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83823 | 33818.1 | 1333.325 | 1551.214 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7415 | 1415.2 | 46.340 | 50.673 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7415 | 3006.1 | 91.770 | 102.972 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7415 | 3006.1 | 88.488 | 107.886 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7415 | 3006.1 | 86.403 | 127.258 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1921 | 366.8 | 8.681 | 9.753 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1921 | 783.6 | 17.863 | 21.788 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1921 | 783.6 | 17.988 | 19.886 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1921 | 783.6 | 20.094 | 22.417 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5690 | 144.9 | 7.435 | 8.335 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5690 | 330.7 | 12.208 | 13.472 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5690 | 330.7 | 12.159 | 13.424 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5690 | 330.7 | 11.898 | 13.189 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 542 | 22.2 | 0.773 | 0.779 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 542 | 51.1 | 1.347 | 2.017 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 542 | 51.1 | 1.347 | 1.354 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 542 | 51.1 | 1.347 | 1.356 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 156 | 5.3 | 0.256 | 0.273 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 156 | 12.0 | 0.391 | 0.397 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 156 | 12.0 | 0.391 | 0.810 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 156 | 12.0 | 0.384 | 0.396 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21230 | 902.3 | 41.560 | 58.103 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21230 | 2063.5 | 77.261 | 84.149 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21230 | 2063.5 | 78.777 | 95.869 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21230 | 2063.5 | 75.640 | 86.232 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1934 | 64.1 | 3.009 | 9.788 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1934 | 147.3 | 5.624 | 6.765 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1934 | 147.3 | 4.879 | 5.234 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1934 | 147.3 | 4.873 | 5.718 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 528 | 22.9 | 0.765 | 1.507 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 528 | 52.4 | 1.389 | 1.542 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 528 | 52.4 | 1.368 | 1.974 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 528 | 52.4 | 1.360 | 1.399 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84068 | 2578.7 | 165.483 | 218.390 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84068 | 5886.3 | 323.857 | 352.886 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84068 | 5886.3 | 308.383 | 319.722 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84068 | 5886.3 | 332.086 | 376.751 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7468 | 335.4 | 12.926 | 15.454 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7468 | 768.4 | 24.749 | 27.238 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7468 | 768.4 | 23.438 | 40.888 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7468 | 768.4 | 22.376 | 24.152 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1934 | 68.6 | 2.919 | 4.654 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1934 | 157.8 | 4.630 | 5.239 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1934 | 157.8 | 4.768 | 5.119 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1934 | 157.8 | 4.984 | 5.597 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5457 | 436.5 | 18.385 | 31.405 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5457 | 1089.6 | 31.037 | 36.435 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5457 | 1089.6 | 31.631 | 38.752 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5457 | 1089.6 | 33.412 | 44.771 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 513 | 41.2 | 1.477 | 5.548 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 513 | 103.0 | 2.413 | 6.053 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 513 | 103.0 | 2.352 | 5.852 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 513 | 103.0 | 2.371 | 5.079 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 133 | 10.9 | 0.442 | 0.452 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 133 | 27.1 | 0.698 | 3.485 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 133 | 27.1 | 0.693 | 0.700 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 133 | 27.1 | 0.693 | 0.706 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21149 | 1776.0 | 84.507 | 112.722 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21149 | 4429.2 | 172.289 | 193.714 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21149 | 4429.2 | 167.024 | 179.999 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21149 | 4429.2 | 158.937 | 171.802 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1865 | 156.6 | 5.335 | 9.468 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1865 | 391.5 | 9.262 | 11.466 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1865 | 391.5 | 9.176 | 10.604 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1865 | 391.5 | 9.096 | 10.506 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 493 | 41.2 | 1.359 | 1.902 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 493 | 103.4 | 2.377 | 2.763 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 493 | 103.4 | 2.377 | 2.847 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 493 | 103.4 | 2.374 | 2.833 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83753 | 7411.7 | 370.160 | 449.910 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83753 | 18461.5 | 699.150 | 780.314 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83753 | 18461.5 | 688.682 | 760.361 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83753 | 18461.5 | 690.118 | 740.517 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7353 | 651.2 | 22.501 | 27.253 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7353 | 1624.9 | 46.754 | 48.232 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7353 | 1624.9 | 43.706 | 46.191 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7353 | 1624.9 | 45.368 | 65.990 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1865 | 164.7 | 5.303 | 9.459 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1865 | 411.5 | 10.012 | 10.751 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1865 | 411.5 | 9.444 | 10.148 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1865 | 411.5 | 9.424 | 10.744 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5596 | 372.8 | 13.120 | 17.079 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5596 | 848.1 | 25.075 | 26.698 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5596 | 848.1 | 24.992 | 26.312 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5596 | 848.1 | 25.258 | 26.909 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 544 | 36.5 | 1.265 | 2.376 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 544 | 83.6 | 2.261 | 2.741 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 544 | 83.6 | 2.156 | 2.760 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 544 | 83.6 | 2.185 | 2.718 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 159 | 10.9 | 0.415 | 0.431 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 159 | 24.7 | 0.690 | 1.032 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 159 | 24.7 | 0.687 | 0.728 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 159 | 24.7 | 0.689 | 0.723 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21220 | 1485.8 | 68.751 | 84.154 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21220 | 3376.6 | 140.940 | 152.865 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21220 | 3376.6 | 133.745 | 143.871 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21220 | 3376.6 | 131.611 | 149.087 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1926 | 135.5 | 4.587 | 10.692 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1926 | 308.6 | 8.163 | 9.219 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1926 | 308.6 | 8.011 | 9.800 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1926 | 308.6 | 7.977 | 9.481 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 509 | 36.1 | 1.216 | 2.023 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 509 | 82.2 | 2.321 | 2.853 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 509 | 82.2 | 2.171 | 2.700 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 509 | 82.2 | 2.166 | 2.576 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84053 | 6217.1 | 317.342 | 358.236 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84053 | 14109.7 | 590.034 | 631.409 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84053 | 14109.7 | 618.654 | 655.939 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84053 | 14109.7 | 638.062 | 686.577 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7485 | 554.6 | 20.384 | 24.203 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7485 | 1260.0 | 37.927 | 42.252 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7485 | 1260.0 | 37.481 | 69.915 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7485 | 1260.0 | 39.972 | 45.714 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1926 | 142.6 | 4.381 | 6.320 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1926 | 324.6 | 8.482 | 10.132 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1926 | 324.6 | 10.163 | 10.829 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1926 | 324.6 | 9.402 | 10.654 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5882 | 701.4 | 26.648 | 40.418 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5882 | 1406.1 | 52.208 | 64.178 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5882 | 1406.1 | 52.449 | 68.380 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5882 | 1406.1 | 47.041 | 62.682 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 610 | 73.6 | 2.619 | 8.594 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 610 | 148.8 | 4.550 | 11.380 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 610 | 148.8 | 4.512 | 10.759 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 610 | 148.8 | 5.004 | 10.417 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 172 | 21.3 | 0.901 | 7.790 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 172 | 43.2 | 1.491 | 1.815 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 172 | 43.2 | 1.888 | 2.525 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 172 | 43.2 | 1.816 | 11.173 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21532 | 2701.0 | 120.339 | 152.692 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21532 | 5404.5 | 211.247 | 232.158 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21532 | 5404.5 | 203.700 | 221.074 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21532 | 5404.5 | 208.419 | 236.183 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2020 | 254.8 | 7.502 | 10.007 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2020 | 512.7 | 14.438 | 16.549 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2020 | 512.7 | 14.457 | 16.627 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2020 | 512.7 | 14.549 | 16.769 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 590 | 75.1 | 2.302 | 3.050 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 590 | 151.8 | 4.263 | 5.027 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 590 | 151.8 | 4.257 | 5.279 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 590 | 151.8 | 4.269 | 5.203 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84620 | 11202.1 | 453.255 | 507.012 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84620 | 22386.5 | 897.762 | 958.236 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84620 | 22386.5 | 886.153 | 1008.100 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84620 | 22386.5 | 954.178 | 997.560 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7662 | 1015.1 | 31.441 | 38.114 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7662 | 2034.6 | 68.450 | 106.338 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7662 | 2034.6 | 67.938 | 79.308 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7662 | 2034.6 | 67.604 | 78.749 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2020 | 268.3 | 7.468 | 9.368 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2020 | 539.8 | 14.764 | 17.174 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2020 | 539.8 | 14.987 | 16.890 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2020 | 539.8 | 15.495 | 17.422 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 9219 | 374.8 | 23.532 | 27.656 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 9219 | 748.0 | 34.603 | 47.160 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 9219 | 748.0 | 34.608 | 39.466 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 9219 | 748.0 | 35.428 | 48.191 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 453 | 19.8 | 0.694 | 4.656 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 453 | 39.4 | 1.198 | 1.290 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 453 | 39.4 | 1.222 | 2.373 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 453 | 39.4 | 1.159 | 1.178 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 253 | 11.1 | 0.492 | 0.824 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 253 | 22.0 | 0.757 | 0.770 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 253 | 22.0 | 0.771 | 0.968 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 253 | 22.0 | 0.758 | 1.182 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 27226 | 1164.6 | 66.467 | 76.633 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 27226 | 2318.9 | 116.163 | 125.592 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 27226 | 2318.9 | 115.895 | 136.185 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 27226 | 2318.9 | 111.335 | 124.553 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1989 | 86.2 | 8.633 | 9.614 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1989 | 173.7 | 11.003 | 14.782 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1989 | 173.7 | 10.520 | 11.496 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1989 | 173.7 | 10.645 | 11.495 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 451 | 20.4 | 0.661 | 0.674 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 451 | 40.6 | 1.197 | 1.738 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 451 | 40.6 | 1.191 | 1.274 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 451 | 40.6 | 1.188 | 1.551 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 80000 | 3600.9 | 361.853 | 459.203 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 80000 | 7186.5 | 489.736 | 538.367 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 80000 | 7186.5 | 482.381 | 541.049 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 80000 | 7186.5 | 516.333 | 606.726 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 13451 | 606.1 | 28.397 | 29.379 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 13451 | 1208.9 | 51.656 | 56.836 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 13451 | 1208.9 | 47.863 | 65.192 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 13451 | 1208.9 | 45.664 | 51.187 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1989 | 90.2 | 8.037 | 8.683 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1989 | 181.8 | 10.154 | 11.005 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1989 | 181.8 | 10.308 | 11.117 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1989 | 181.8 | 10.577 | 20.889 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5704 | 1092.2 | 24.209 | 25.265 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5704 | 2230.3 | 62.697 | 69.135 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5704 | 2230.3 | 62.440 | 76.920 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5704 | 2230.3 | 60.530 | 67.467 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 504 | 99.9 | 1.756 | 1.834 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 504 | 206.3 | 4.564 | 5.599 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 504 | 206.3 | 4.498 | 5.753 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 504 | 206.3 | 4.482 | 5.472 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 140 | 27.9 | 0.546 | 0.994 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 140 | 56.8 | 1.207 | 1.238 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 140 | 56.8 | 1.209 | 1.267 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 140 | 56.8 | 1.214 | 1.221 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21340 | 4321.1 | 141.434 | 169.629 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21340 | 8785.3 | 296.220 | 343.513 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21340 | 8785.3 | 320.772 | 338.998 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21340 | 8785.3 | 322.298 | 367.463 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1914 | 398.8 | 7.643 | 10.530 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1914 | 821.2 | 19.357 | 23.286 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1914 | 821.2 | 18.880 | 22.118 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1914 | 821.2 | 18.628 | 21.185 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 540 | 112.8 | 1.880 | 2.499 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 540 | 229.5 | 4.852 | 5.896 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 540 | 229.5 | 4.873 | 5.800 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 540 | 229.5 | 4.861 | 5.885 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84148 | 18084.4 | 605.114 | 694.253 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84148 | 36756.0 | 1341.057 | 1450.957 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84148 | 36756.0 | 1345.549 | 1517.356 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84148 | 36756.0 | 1326.920 | 1435.596 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7410 | 1636.6 | 39.156 | 41.860 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7410 | 3348.5 | 91.006 | 93.602 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7410 | 3348.5 | 90.787 | 101.920 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7410 | 3348.5 | 92.874 | 108.175 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1914 | 422.8 | 7.296 | 9.550 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1914 | 870.4 | 19.590 | 21.812 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1914 | 870.4 | 20.319 | 32.943 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1914 | 870.4 | 18.908 | 22.614 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5796 | 137.0 | 4.630 | 5.515 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5796 | 270.6 | 8.884 | 10.784 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5796 | 270.6 | 9.744 | 11.420 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5796 | 270.6 | 10.618 | 12.447 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 532 | 13.1 | 0.373 | 0.541 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 532 | 25.7 | 0.918 | 1.055 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 532 | 25.7 | 0.765 | 1.346 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 532 | 25.7 | 0.764 | 1.367 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 164 | 4.5 | 0.121 | 0.131 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 164 | 8.7 | 0.242 | 0.255 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 164 | 8.7 | 0.349 | 0.487 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 164 | 8.7 | 0.443 | 0.476 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21644 | 555.3 | 24.589 | 39.608 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21644 | 1097.1 | 41.454 | 43.697 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21644 | 1097.1 | 41.220 | 49.577 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21644 | 1097.1 | 41.370 | 42.415 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1888 | 48.8 | 1.297 | 1.306 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1888 | 96.4 | 2.732 | 3.114 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1888 | 96.4 | 2.723 | 3.352 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1888 | 96.4 | 2.806 | 3.756 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 496 | 13.2 | 0.367 | 0.395 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 496 | 26.0 | 0.739 | 0.818 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 496 | 26.0 | 0.781 | 1.242 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 496 | 26.0 | 0.735 | 0.745 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84752 | 2367.2 | 110.783 | 138.709 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84752 | 4673.6 | 221.082 | 258.890 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84752 | 4673.6 | 216.205 | 272.234 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84752 | 4673.6 | 224.802 | 267.527 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7360 | 206.1 | 5.386 | 8.562 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7360 | 407.6 | 11.901 | 13.809 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7360 | 407.6 | 11.947 | 14.372 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7360 | 407.6 | 13.036 | 15.011 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1888 | 53.3 | 1.290 | 1.933 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1888 | 105.5 | 2.733 | 3.461 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1888 | 105.5 | 2.749 | 3.531 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1888 | 105.5 | 2.749 | 3.491 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5990 | 242.1 | 7.279 | 8.131 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5990 | 505.1 | 14.818 | 16.840 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5990 | 505.1 | 14.359 | 16.576 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5990 | 505.1 | 15.548 | 17.876 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 581 | 24.0 | 0.690 | 0.737 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 581 | 50.6 | 1.396 | 2.783 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 581 | 50.6 | 1.330 | 1.478 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 581 | 50.6 | 1.432 | 1.964 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 174 | 7.6 | 0.298 | 0.350 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 174 | 16.0 | 0.497 | 0.714 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 174 | 16.0 | 0.496 | 1.097 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 174 | 16.0 | 0.468 | 0.722 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 22468 | 954.9 | 42.802 | 53.514 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 22468 | 1987.3 | 77.148 | 95.285 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 22468 | 1987.3 | 76.726 | 87.430 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 22468 | 1987.3 | 78.432 | 103.290 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2033 | 86.9 | 2.600 | 4.795 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2033 | 181.5 | 4.944 | 5.721 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2033 | 181.5 | 5.157 | 5.854 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2033 | 181.5 | 5.214 | 5.817 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 551 | 24.0 | 0.726 | 0.909 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 551 | 50.7 | 1.325 | 1.979 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 551 | 50.7 | 1.300 | 1.337 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 551 | 50.7 | 1.299 | 1.811 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 88769 | 3977.6 | 180.314 | 219.351 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 88769 | 8264.9 | 348.530 | 383.362 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 88769 | 8264.9 | 348.348 | 379.591 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 88769 | 8264.9 | 340.179 | 380.333 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7874 | 353.0 | 11.898 | 12.876 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7874 | 736.6 | 22.602 | 23.743 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7874 | 736.6 | 23.234 | 24.611 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7874 | 736.6 | 22.778 | 26.511 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2033 | 91.6 | 2.737 | 4.346 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2033 | 191.5 | 5.274 | 6.081 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2033 | 191.5 | 5.229 | 6.093 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2033 | 191.5 | 4.985 | 5.648 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5572 | 297.2 | 19.328 | 22.085 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5572 | 594.2 | 28.560 | 46.838 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5572 | 594.2 | 28.671 | 30.704 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5572 | 594.2 | 28.655 | 29.660 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 520 | 28.1 | 1.845 | 1.895 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 520 | 57.2 | 2.558 | 3.564 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 520 | 57.2 | 2.571 | 3.138 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 520 | 57.2 | 2.572 | 3.168 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 144 | 8.0 | 0.591 | 0.609 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 144 | 16.3 | 0.789 | 0.817 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 144 | 16.3 | 0.787 | 0.796 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 144 | 16.3 | 0.786 | 0.789 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21198 | 1190.0 | 92.363 | 111.281 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21198 | 2373.2 | 144.401 | 167.374 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21198 | 2373.2 | 145.227 | 195.938 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21198 | 2373.2 | 132.907 | 146.891 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1890 | 106.8 | 6.143 | 8.086 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1890 | 215.0 | 9.591 | 10.833 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1890 | 215.0 | 9.374 | 10.086 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1890 | 215.0 | 9.225 | 10.155 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 500 | 28.4 | 1.960 | 1.980 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 500 | 57.8 | 2.692 | 3.234 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 500 | 57.8 | 2.694 | 3.100 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 500 | 57.8 | 2.681 | 3.146 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83716 | 4967.2 | 422.179 | 449.746 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83716 | 9888.9 | 644.018 | 676.282 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83716 | 9888.9 | 623.229 | 654.607 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83716 | 9888.9 | 660.179 | 676.446 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7348 | 434.7 | 31.042 | 32.882 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7348 | 869.0 | 41.286 | 66.754 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7348 | 869.0 | 42.030 | 44.969 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7348 | 869.0 | 46.608 | 58.220 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1890 | 112.4 | 6.189 | 7.685 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1890 | 226.4 | 9.107 | 10.622 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1890 | 226.4 | 9.257 | 10.479 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1890 | 226.4 | 9.206 | 10.558 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5704 | 177.6 | 5.313 | 8.892 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5704 | 352.7 | 12.709 | 15.287 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5704 | 352.7 | 12.633 | 16.908 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5704 | 352.7 | 11.308 | 15.592 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 504 | 16.0 | 0.442 | 1.281 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 504 | 31.9 | 0.931 | 0.948 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 504 | 31.9 | 0.994 | 1.425 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 504 | 31.9 | 0.932 | 0.938 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 140 | 4.7 | 0.145 | 0.154 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 140 | 9.4 | 0.299 | 0.306 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 140 | 9.4 | 0.278 | 0.320 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 140 | 9.4 | 0.276 | 0.285 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21340 | 722.4 | 36.280 | 47.295 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21340 | 1432.8 | 66.799 | 80.909 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21340 | 1432.8 | 63.793 | 76.704 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21340 | 1432.8 | 62.800 | 82.172 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 62.9 | 1.691 | 8.464 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 125.5 | 3.521 | 4.037 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 125.5 | 3.436 | 4.041 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 125.5 | 3.459 | 4.483 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 480 | 16.6 | 0.450 | 0.461 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 480 | 33.1 | 0.914 | 1.570 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 480 | 33.1 | 0.919 | 1.052 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 480 | 33.1 | 0.933 | 1.598 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84148 | 3106.5 | 145.001 | 217.424 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84148 | 6156.9 | 306.770 | 361.173 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84148 | 6156.9 | 308.149 | 358.625 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84148 | 6156.9 | 313.624 | 403.791 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7296 | 269.7 | 6.604 | 11.025 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7296 | 536.4 | 16.124 | 19.679 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7296 | 536.4 | 16.768 | 18.507 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7296 | 536.4 | 17.004 | 19.127 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 68.9 | 1.716 | 2.881 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 137.5 | 3.572 | 4.605 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 137.5 | 3.567 | 4.299 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 137.5 | 3.540 | 4.299 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5704 | 481.9 | 83.469 | 91.338 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5704 | 1221.3 | 110.808 | 130.443 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5704 | 1221.3 | 107.740 | 125.252 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5704 | 1221.3 | 102.932 | 143.984 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 504 | 43.0 | 8.925 | 12.631 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 504 | 108.4 | 10.192 | 11.593 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 504 | 108.4 | 10.986 | 17.370 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 504 | 108.4 | 10.385 | 10.868 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 140 | 8.9 | 2.789 | 3.198 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 140 | 21.6 | 3.042 | 3.604 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 140 | 21.6 | 3.044 | 3.485 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 140 | 21.6 | 3.059 | 3.540 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21340 | 1921.5 | 400.942 | 470.464 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21340 | 4866.5 | 494.255 | 577.196 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21340 | 4866.5 | 495.747 | 542.295 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21340 | 4866.5 | 524.428 | 577.153 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 167.4 | 35.693 | 39.078 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 423.6 | 41.485 | 45.928 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 423.6 | 42.030 | 46.828 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 423.6 | 42.293 | 47.076 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 480 | 32.3 | 9.218 | 10.488 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 480 | 79.8 | 10.330 | 11.435 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 480 | 79.8 | 10.068 | 11.089 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 480 | 79.8 | 10.265 | 11.586 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84148 | 8097.2 | 1615.538 | 1939.930 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84148 | 20493.9 | 2049.699 | 2365.315 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84148 | 20493.9 | 2097.971 | 2282.941 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84148 | 20493.9 | 2090.026 | 2292.016 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7296 | 702.2 | 140.386 | 145.965 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7296 | 1776.8 | 177.673 | 191.100 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7296 | 1776.8 | 179.994 | 218.499 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7296 | 1776.8 | 175.313 | 206.122 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 135.4 | 35.886 | 37.431 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 336.1 | 38.782 | 43.138 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 336.1 | 39.593 | 56.492 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 336.1 | 38.257 | 40.683 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5649 | 228.7 | 1933.686 | 2004.709 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5649 | 455.3 | 1942.493 | 1993.645 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5649 | 455.3 | 1960.371 | 2049.721 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5649 | 455.3 | 1933.068 | 2014.689 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 550 | 22.7 | 403.827 | 423.140 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 550 | 45.5 | 394.292 | 401.073 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 550 | 45.5 | 398.958 | 407.698 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 550 | 45.5 | 405.521 | 424.381 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 151 | 6.6 | 246.178 | 253.141 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 151 | 13.2 | 250.919 | 254.529 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 151 | 13.2 | 254.309 | 262.069 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 151 | 13.2 | 250.430 | 269.823 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21170 | 899.2 | 6396.882 | 6511.240 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21170 | 1786.7 | 6398.216 | 6830.042 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21170 | 1786.7 | 6595.852 | 6681.228 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21170 | 1786.7 | 6430.988 | 6588.468 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1943 | 83.0 | 910.815 | 922.677 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1943 | 165.9 | 931.317 | 973.982 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1943 | 165.9 | 915.464 | 953.149 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1943 | 165.9 | 914.010 | 928.216 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 535 | 23.3 | 433.719 | 444.092 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 535 | 46.7 | 433.749 | 443.075 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 535 | 46.7 | 431.319 | 434.180 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 535 | 46.7 | 433.866 | 452.805 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83646 | 3745.1 | 22596.498 | 22760.493 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83646 | 7433.0 | 22514.291 | 24896.545 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83646 | 7433.0 | 22800.211 | 23075.755 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83646 | 7433.0 | 22709.144 | 23740.486 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7467 | 334.7 | 2639.864 | 2763.332 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7467 | 666.6 | 2652.381 | 2704.682 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7467 | 666.6 | 2623.045 | 2677.473 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7467 | 666.6 | 2600.214 | 2646.962 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1943 | 87.3 | 929.960 | 974.263 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1943 | 174.6 | 941.253 | 1019.449 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1943 | 174.6 | 1047.542 | 1059.190 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1943 | 174.6 | 1010.693 | 1090.062 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5945 | 319.4 | 9.500 | 24.469 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5945 | 737.7 | 21.144 | 29.201 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5945 | 737.7 | 21.314 | 30.535 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5945 | 737.7 | 20.617 | 34.965 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 577 | 31.2 | 0.860 | 1.054 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 577 | 71.4 | 1.752 | 4.449 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 577 | 71.4 | 1.674 | 1.958 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 577 | 71.4 | 1.738 | 2.217 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 160 | 8.8 | 0.278 | 0.293 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 160 | 20.2 | 0.523 | 0.702 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 160 | 20.2 | 0.503 | 0.679 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 160 | 20.2 | 0.591 | 0.846 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 22103 | 1245.0 | 37.488 | 45.410 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 22103 | 2877.6 | 95.614 | 137.053 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 22103 | 2877.6 | 79.900 | 101.171 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 22103 | 2877.6 | 84.511 | 109.111 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2071 | 116.4 | 3.148 | 15.336 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2071 | 266.2 | 5.998 | 9.027 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2071 | 266.2 | 6.488 | 7.359 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2071 | 266.2 | 6.105 | 8.253 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 555 | 30.6 | 0.797 | 0.848 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 555 | 69.5 | 1.550 | 2.470 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 555 | 69.5 | 1.544 | 2.240 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 555 | 69.5 | 1.629 | 2.563 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 85913 | 5109.2 | 242.098 | 342.488 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 85913 | 11822.9 | 480.055 | 524.947 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 85913 | 11822.9 | 483.743 | 535.949 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 85913 | 11822.9 | 531.692 | 616.767 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7735 | 455.7 | 13.092 | 33.671 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7735 | 1053.0 | 32.500 | 40.815 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7735 | 1053.0 | 28.399 | 32.803 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7735 | 1053.0 | 26.949 | 30.149 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2071 | 119.5 | 2.289 | 4.960 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2071 | 272.9 | 5.796 | 7.424 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2071 | 272.9 | 5.614 | 7.308 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2071 | 272.9 | 6.245 | 7.416 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5709 | 270.2 | 179.188 | 207.962 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5709 | 2540.5 | 278.924 | 333.660 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5709 | 2540.5 | 278.184 | 350.694 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5709 | 2540.5 | 247.308 | 279.983 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 506 | 25.9 | 39.834 | 44.659 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 506 | 231.2 | 44.579 | 76.564 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 506 | 231.2 | 42.715 | 56.171 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 506 | 231.2 | 39.597 | 55.968 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 141 | 9.4 | 21.195 | 27.074 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 141 | 66.6 | 19.902 | 32.553 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 141 | 66.6 | 21.494 | 31.356 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 141 | 66.6 | 21.207 | 29.677 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21347 | 1138.3 | 733.155 | 1018.760 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21347 | 10103.3 | 1056.388 | 1193.626 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21347 | 10103.3 | 991.085 | 1114.835 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21347 | 10103.3 | 941.432 | 1150.495 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1862 | 106.9 | 68.263 | 73.289 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1862 | 903.7 | 88.294 | 104.960 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1862 | 903.7 | 86.920 | 103.441 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1862 | 903.7 | 84.983 | 101.258 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 484 | 25.6 | 31.986 | 35.774 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 484 | 232.7 | 35.488 | 53.458 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 484 | 232.7 | 35.412 | 42.632 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 484 | 232.7 | 33.128 | 48.539 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84171 | 4764.3 | 2338.755 | 2847.509 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84171 | 42212.0 | 3543.049 | 3801.155 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84171 | 42212.0 | 3558.102 | 3922.612 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84171 | 42212.0 | 3532.169 | 3766.842 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7310 | 401.7 | 209.922 | 290.347 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7310 | 3710.0 | 297.916 | 321.461 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7310 | 3710.0 | 294.054 | 333.279 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7310 | 3710.0 | 296.535 | 331.336 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1862 | 112.5 | 69.582 | 93.130 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1862 | 955.3 | 86.674 | 96.438 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1862 | 955.3 | 89.213 | 107.427 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1862 | 955.3 | 80.246 | 82.731 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5591 | 446.3 | 1458.504 | 1486.432 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5591 | 896.5 | 1481.157 | 1504.450 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5591 | 896.5 | 1473.945 | 1520.464 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5591 | 896.5 | 1471.354 | 1503.528 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 526 | 42.6 | 198.705 | 202.114 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 526 | 87.0 | 199.783 | 201.549 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 526 | 87.0 | 200.937 | 212.501 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 526 | 87.0 | 201.260 | 203.906 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 148 | 12.3 | 83.429 | 84.498 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 148 | 25.5 | 84.417 | 86.669 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 148 | 25.5 | 83.605 | 84.937 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 148 | 25.5 | 84.775 | 98.133 |
