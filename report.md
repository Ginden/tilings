# Tiling performance report

2026-09-10T22:37:57.768Z · Node v24.19.0 · linux/x64 · AMD Ryzen 9 5950X 16-Core Processor

42 tilings × 36 setting combinations = 1512 benchmark rows.
1 warmup renders and 6 measured renders per combination, run sequentially in one process.
Times cover synchronous production SVG generation, including geometry, clipping and serialization where applicable.
Module loading, browser painting, worker messaging and PNG rasterization are excluded.
Colours: #f2c14e / #1b3a5c; border: #101820 when enabled.
Hierarchy is the requested level count; unsupported settings are ignored or clamped by the production renderer.
Periodic tile counts are viewport estimates; patch counts are retained tiles after clipping.
The renderer is called directly, without the UI's tile-count cap. Caches and normal garbage collection remain enabled.
Median averages the two central samples for even run counts; p95 uses nearest rank.

| Tiling | ID | Viewport | Tile px | Rotation ° | Hierarchy | Loop limit | Border px | Seed | Render path | Tiles | SVG KiB | Median ms | p95 ms |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | ---: | ---: | ---: |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5595 | 300.1 | 45.173 | 54.564 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5595 | 600.6 | 45.419 | 50.296 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5595 | 600.6 | 42.586 | 43.855 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5595 | 600.6 | 42.942 | 51.627 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 524 | 28.4 | 2.813 | 2.901 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 524 | 57.4 | 3.272 | 8.612 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 524 | 57.4 | 3.685 | 10.985 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 524 | 57.4 | 3.253 | 3.633 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 156 | 8.7 | 0.552 | 0.576 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 156 | 17.7 | 0.773 | 0.798 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 156 | 17.7 | 0.773 | 0.836 |
| Penrose P3 — rhombs | penrose-p3 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 156 | 17.7 | 0.777 | 0.797 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21148 | 1191.6 | 146.512 | 217.749 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21148 | 2376.8 | 203.071 | 222.903 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21148 | 2376.8 | 200.893 | 229.486 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21148 | 2376.8 | 205.899 | 234.459 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1938 | 109.5 | 9.397 | 21.107 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1938 | 220.1 | 12.326 | 20.520 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1938 | 220.1 | 12.220 | 14.101 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1938 | 220.1 | 11.921 | 19.175 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 503 | 28.4 | 2.525 | 2.629 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 503 | 57.8 | 3.211 | 9.393 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 503 | 57.8 | 3.307 | 9.231 |
| Penrose P3 — rhombs | penrose-p3 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 503 | 57.8 | 3.315 | 3.474 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83438 | 4950.3 | 719.812 | 735.959 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83438 | 9853.4 | 925.289 | 1016.728 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83438 | 9853.4 | 925.836 | 975.552 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83438 | 9853.4 | 965.079 | 1055.141 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7396 | 439.6 | 46.984 | 53.529 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7396 | 879.6 | 61.820 | 68.939 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7396 | 879.6 | 61.418 | 90.604 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7396 | 879.6 | 67.361 | 89.407 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1938 | 114.7 | 9.385 | 19.249 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1938 | 230.5 | 13.580 | 21.509 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1938 | 230.5 | 16.139 | 18.667 |
| Penrose P3 — rhombs | penrose-p3 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1938 | 230.5 | 14.081 | 21.198 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5644 | 300.3 | 51.669 | 55.080 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5644 | 600.3 | 50.849 | 71.185 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5644 | 600.3 | 46.471 | 54.335 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5644 | 600.3 | 50.418 | 66.882 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 524 | 28.5 | 2.381 | 2.409 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 524 | 57.8 | 3.075 | 9.214 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 524 | 57.8 | 3.238 | 9.667 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 524 | 57.8 | 3.582 | 3.831 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 155 | 8.5 | 1.046 | 1.551 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 155 | 17.3 | 1.494 | 10.273 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 155 | 17.3 | 1.309 | 1.563 |
| Penrose P2 — kite and dart | penrose-p2 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 155 | 17.3 | 1.105 | 1.222 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21296 | 1191.4 | 161.421 | 174.681 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21296 | 2375.6 | 213.583 | 237.771 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21296 | 2375.6 | 197.161 | 224.590 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21296 | 2375.6 | 212.157 | 216.945 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1924 | 108.2 | 10.668 | 17.740 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1924 | 217.2 | 13.377 | 22.549 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1924 | 217.2 | 14.715 | 28.170 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1924 | 217.2 | 15.164 | 16.646 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 539 | 30.6 | 2.153 | 5.614 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 539 | 62.0 | 3.057 | 4.153 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 539 | 62.0 | 2.985 | 5.742 |
| Penrose P2 — kite and dart | penrose-p2 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 539 | 62.0 | 2.915 | 2.942 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83931 | 4973.0 | 587.726 | 629.362 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83931 | 9901.4 | 805.630 | 855.448 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83931 | 9901.4 | 853.994 | 902.755 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83931 | 9901.4 | 789.650 | 860.348 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7346 | 434.4 | 47.428 | 49.174 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7346 | 868.7 | 57.497 | 65.564 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7346 | 868.7 | 58.481 | 59.842 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7346 | 868.7 | 58.924 | 61.267 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1924 | 113.6 | 9.116 | 11.108 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1924 | 228.0 | 12.306 | 14.812 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1924 | 228.0 | 12.974 | 15.961 |
| Penrose P2 — kite and dart | penrose-p2 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1924 | 228.0 | 12.750 | 14.765 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5531 | 387.3 | 25.471 | 29.837 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5531 | 776.8 | 34.649 | 36.877 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5531 | 776.8 | 35.701 | 45.631 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5531 | 776.8 | 33.749 | 34.495 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 533 | 37.7 | 2.310 | 2.905 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 533 | 76.7 | 3.106 | 4.013 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 533 | 76.7 | 3.088 | 3.256 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 533 | 76.7 | 3.080 | 3.493 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 150 | 11.4 | 0.932 | 1.520 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 150 | 23.2 | 1.198 | 1.221 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 150 | 23.2 | 1.206 | 1.454 |
| Penrose P1 — pentagons | penrose-p1 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 150 | 23.2 | 1.212 | 1.624 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21167 | 1554.8 | 93.454 | 120.374 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21167 | 3107.8 | 149.208 | 171.954 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21167 | 3107.8 | 145.373 | 175.326 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21167 | 3107.8 | 144.663 | 168.447 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1889 | 140.1 | 8.128 | 10.577 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1889 | 282.0 | 11.553 | 11.741 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1889 | 282.0 | 11.282 | 12.066 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1889 | 282.0 | 11.217 | 12.882 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 521 | 38.9 | 2.224 | 2.883 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 521 | 79.0 | 3.217 | 4.233 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 521 | 79.0 | 3.187 | 3.671 |
| Penrose P1 — pentagons | penrose-p1 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 521 | 79.0 | 3.222 | 3.741 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83834 | 6486.5 | 355.850 | 449.639 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83834 | 12937.6 | 649.566 | 684.835 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83834 | 12937.6 | 638.230 | 671.469 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83834 | 12937.6 | 625.192 | 754.885 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7428 | 577.6 | 33.425 | 35.045 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7428 | 1158.4 | 50.540 | 58.042 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7428 | 1158.4 | 50.687 | 52.932 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7428 | 1158.4 | 50.575 | 57.216 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1889 | 147.5 | 8.289 | 9.552 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1889 | 297.1 | 12.510 | 14.158 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1889 | 297.1 | 12.614 | 13.695 |
| Penrose P1 — pentagons | penrose-p1 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1889 | 297.1 | 11.992 | 14.381 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5364 | 286.0 | 16.264 | 80.114 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5364 | 572.4 | 20.049 | 24.763 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5364 | 572.4 | 19.318 | 23.444 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5364 | 572.4 | 22.734 | 28.525 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 515 | 28.1 | 1.231 | 2.738 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 515 | 57.2 | 1.754 | 2.239 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 515 | 57.2 | 1.720 | 1.763 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 515 | 57.2 | 1.713 | 3.067 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 137 | 7.7 | 0.404 | 0.769 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 137 | 15.8 | 0.594 | 0.677 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 137 | 15.8 | 0.614 | 1.046 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 137 | 15.8 | 0.605 | 0.625 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 20181 | 1131.6 | 35.588 | 46.349 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 20181 | 2258.0 | 84.249 | 101.437 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 20181 | 2258.0 | 80.504 | 90.780 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 20181 | 2258.0 | 83.028 | 102.851 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1791 | 101.3 | 2.832 | 9.036 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1791 | 203.8 | 5.807 | 7.904 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1791 | 203.8 | 5.664 | 6.621 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1791 | 203.8 | 5.593 | 6.880 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 482 | 27.6 | 0.953 | 1.490 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 482 | 56.0 | 1.657 | 1.692 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 482 | 56.0 | 1.647 | 1.797 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 482 | 56.0 | 1.649 | 2.214 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 79348 | 4714.9 | 183.892 | 249.397 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 79348 | 9386.9 | 400.323 | 471.917 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 79348 | 9386.9 | 399.305 | 462.994 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 79348 | 9386.9 | 398.328 | 459.394 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7067 | 420.5 | 10.233 | 11.727 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7067 | 842.0 | 23.424 | 26.087 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7067 | 842.0 | 32.674 | 79.389 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7067 | 842.0 | 23.657 | 25.771 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1791 | 107.0 | 2.795 | 3.406 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1791 | 215.3 | 5.635 | 6.434 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1791 | 215.3 | 5.811 | 13.821 |
| Penrose rhombs — pentagrid | penrose-pentagrid | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1791 | 215.3 | 5.711 | 6.910 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5674 | 229.6 | 6.129 | 8.388 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5674 | 457.2 | 13.769 | 16.815 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5674 | 457.2 | 13.706 | 16.513 |
| Robinson triangles | robinson-triangles | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5674 | 457.2 | 13.462 | 16.002 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 560 | 22.7 | 0.695 | 0.746 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 560 | 45.6 | 1.254 | 1.557 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 560 | 45.6 | 1.229 | 1.260 |
| Robinson triangles | robinson-triangles | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 560 | 45.6 | 1.237 | 1.295 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 158 | 6.5 | 0.246 | 0.699 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 158 | 13.2 | 0.438 | 0.527 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 158 | 13.2 | 0.444 | 0.490 |
| Robinson triangles | robinson-triangles | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 158 | 13.2 | 0.413 | 0.449 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21228 | 899.7 | 34.820 | 37.819 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21228 | 1786.6 | 67.594 | 80.133 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21228 | 1786.6 | 68.592 | 72.571 |
| Robinson triangles | robinson-triangles | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21228 | 1786.6 | 68.081 | 76.774 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 81.8 | 2.257 | 7.079 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 163.5 | 4.239 | 5.333 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 163.5 | 4.880 | 5.047 |
| Robinson triangles | robinson-triangles | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 163.5 | 4.584 | 5.130 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 514 | 22.0 | 0.680 | 0.802 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 514 | 44.1 | 1.319 | 1.515 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 514 | 44.1 | 1.257 | 1.969 |
| Robinson triangles | robinson-triangles | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 514 | 44.1 | 1.220 | 1.285 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83764 | 3742.3 | 161.256 | 202.085 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83764 | 7428.3 | 313.940 | 348.257 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83764 | 7428.3 | 309.573 | 352.251 |
| Robinson triangles | robinson-triangles | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83764 | 7428.3 | 303.438 | 329.284 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7490 | 334.5 | 10.951 | 26.095 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7490 | 666.9 | 19.941 | 22.661 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7490 | 666.9 | 19.871 | 22.092 |
| Robinson triangles | robinson-triangles | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7490 | 666.9 | 22.123 | 24.391 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 86.2 | 1.996 | 2.067 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 172.4 | 5.217 | 6.804 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 172.4 | 4.686 | 6.334 |
| Robinson triangles | robinson-triangles | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 172.4 | 4.360 | 5.407 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5836 | 308.5 | 12.037 | 22.414 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5836 | 617.7 | 23.206 | 27.248 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5836 | 617.7 | 21.421 | 30.371 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5836 | 617.7 | 18.913 | 21.888 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 521 | 28.1 | 0.812 | 0.861 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 521 | 57.1 | 1.594 | 2.838 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 521 | 57.1 | 1.539 | 1.991 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 521 | 57.1 | 1.604 | 1.923 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 141 | 7.7 | 0.344 | 0.851 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 141 | 15.7 | 0.530 | 0.560 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 141 | 15.7 | 0.515 | 0.547 |
| Ammann–Beenker (8-fold) | ammann-beenker | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 141 | 15.7 | 0.497 | 0.512 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21892 | 1217.1 | 35.029 | 44.547 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21892 | 2428.0 | 98.016 | 119.088 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21892 | 2428.0 | 90.511 | 121.661 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21892 | 2428.0 | 87.189 | 90.934 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1945 | 109.7 | 2.491 | 2.755 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1945 | 220.3 | 5.512 | 6.605 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1945 | 220.3 | 5.545 | 7.414 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1945 | 220.3 | 5.524 | 6.243 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 502 | 28.3 | 0.798 | 0.801 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 502 | 57.4 | 1.541 | 2.179 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 502 | 57.4 | 1.539 | 1.604 |
| Ammann–Beenker (8-fold) | ammann-beenker | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 502 | 57.4 | 1.538 | 1.566 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 86320 | 5077.2 | 153.641 | 176.001 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 86320 | 10109.3 | 447.144 | 487.989 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 86320 | 10109.3 | 423.358 | 465.155 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 86320 | 10109.3 | 445.514 | 458.739 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7661 | 452.4 | 10.697 | 14.750 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7661 | 904.4 | 27.972 | 40.087 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7661 | 904.4 | 31.702 | 48.925 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7661 | 904.4 | 29.679 | 33.552 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1945 | 115.3 | 2.598 | 3.554 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1945 | 231.7 | 5.919 | 6.379 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1945 | 231.7 | 5.668 | 8.005 |
| Ammann–Beenker (8-fold) | ammann-beenker | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1945 | 231.7 | 5.761 | 6.660 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5543 | 297.4 | 16.989 | 31.280 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5543 | 595.0 | 20.243 | 30.512 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5543 | 595.0 | 20.790 | 26.323 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5543 | 595.0 | 19.645 | 21.900 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 526 | 28.4 | 1.192 | 1.222 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 526 | 57.8 | 1.934 | 2.465 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 526 | 57.8 | 1.881 | 1.924 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 526 | 57.8 | 1.882 | 1.888 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 144 | 8.1 | 0.489 | 0.886 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 144 | 16.4 | 0.671 | 0.685 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 144 | 16.4 | 0.704 | 0.733 |
| Dodecagonal (12-fold) | dodecagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 144 | 16.4 | 0.673 | 0.722 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 20694 | 1164.5 | 37.970 | 62.429 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 20694 | 2322.0 | 86.676 | 98.877 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 20694 | 2322.0 | 85.936 | 90.738 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 20694 | 2322.0 | 81.398 | 101.135 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1876 | 105.5 | 3.801 | 43.946 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1876 | 212.3 | 8.260 | 11.183 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1876 | 212.3 | 6.867 | 12.221 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1876 | 212.3 | 6.028 | 9.136 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 492 | 28.2 | 1.098 | 1.104 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 492 | 57.0 | 1.830 | 1.841 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 492 | 57.0 | 1.831 | 2.257 |
| Dodecagonal (12-fold) | dodecagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 492 | 57.0 | 1.820 | 1.835 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 82322 | 4888.2 | 156.130 | 211.920 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 82322 | 9732.8 | 407.258 | 443.099 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 82322 | 9732.8 | 436.651 | 555.250 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 82322 | 9732.8 | 473.669 | 490.750 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7238 | 429.0 | 18.442 | 19.636 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7238 | 858.2 | 35.274 | 55.381 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7238 | 858.2 | 25.225 | 29.441 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7238 | 858.2 | 25.517 | 34.997 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1876 | 111.8 | 3.527 | 5.265 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1876 | 225.0 | 6.135 | 7.865 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1876 | 225.0 | 6.423 | 8.262 |
| Dodecagonal (12-fold) | dodecagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1876 | 225.0 | 6.355 | 7.332 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5162 | 276.4 | 9.988 | 19.187 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5162 | 553.1 | 19.194 | 20.161 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5162 | 553.1 | 18.252 | 27.369 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5162 | 553.1 | 18.277 | 19.745 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 481 | 26.1 | 1.315 | 1.477 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 481 | 52.8 | 1.978 | 2.146 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 481 | 52.8 | 1.959 | 2.586 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 481 | 52.8 | 1.961 | 1.973 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 138 | 7.7 | 0.608 | 0.618 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 138 | 15.7 | 0.784 | 0.816 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 138 | 15.7 | 0.779 | 0.796 |
| Heptagonal (14-fold) | heptagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 138 | 15.7 | 0.786 | 0.792 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 19305 | 1083.5 | 39.388 | 49.441 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 19305 | 2160.6 | 79.912 | 88.402 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 19305 | 2160.6 | 84.450 | 93.253 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 19305 | 2160.6 | 80.860 | 104.988 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1750 | 98.9 | 3.435 | 6.509 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1750 | 198.9 | 6.349 | 7.121 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1750 | 198.9 | 6.263 | 7.030 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1750 | 198.9 | 6.293 | 6.870 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 471 | 26.6 | 1.272 | 1.795 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 471 | 53.9 | 1.951 | 1.962 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 471 | 53.9 | 1.964 | 2.480 |
| Heptagonal (14-fold) | heptagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 471 | 53.9 | 1.955 | 1.968 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 76598 | 4539.0 | 161.624 | 177.473 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 76598 | 9037.6 | 404.832 | 530.316 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 76598 | 9037.6 | 403.081 | 469.028 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 76598 | 9037.6 | 415.946 | 473.227 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 6827 | 405.8 | 12.976 | 15.402 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 6827 | 812.3 | 25.625 | 26.831 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 6827 | 812.3 | 25.385 | 26.412 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 6827 | 812.3 | 24.638 | 26.116 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1750 | 104.1 | 5.384 | 15.328 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1750 | 209.5 | 7.455 | 8.339 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1750 | 209.5 | 6.103 | 7.036 |
| Heptagonal (14-fold) | heptagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1750 | 209.5 | 6.167 | 7.208 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5150 | 276.2 | 13.145 | 16.077 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5150 | 552.4 | 22.794 | 24.006 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5150 | 552.4 | 23.123 | 24.350 |
| Decagonal (20-fold) | decagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5150 | 552.4 | 22.867 | 24.110 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 503 | 27.6 | 1.986 | 2.510 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 503 | 55.8 | 2.677 | 2.687 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 503 | 55.8 | 2.676 | 3.085 |
| Decagonal (20-fold) | decagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 503 | 55.8 | 2.690 | 3.060 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 137 | 7.9 | 1.030 | 1.043 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 137 | 16.0 | 1.226 | 1.234 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 137 | 16.0 | 1.218 | 1.227 |
| Decagonal (20-fold) | decagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 137 | 16.0 | 1.224 | 1.230 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 19548 | 1101.7 | 55.854 | 67.561 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 19548 | 2197.4 | 105.087 | 112.864 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 19548 | 2197.4 | 104.730 | 119.325 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 19548 | 2197.4 | 103.658 | 112.098 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1754 | 99.2 | 5.309 | 5.730 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1754 | 199.6 | 7.919 | 8.991 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1754 | 199.6 | 8.043 | 8.408 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1754 | 199.6 | 7.888 | 8.867 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 473 | 27.3 | 1.992 | 2.021 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 473 | 55.1 | 2.710 | 3.204 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 473 | 55.1 | 2.760 | 3.482 |
| Decagonal (20-fold) | decagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 473 | 55.1 | 2.697 | 2.709 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 77496 | 4604.2 | 222.001 | 270.564 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 77496 | 9167.4 | 461.334 | 496.888 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 77496 | 9167.4 | 474.273 | 514.553 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 77496 | 9167.4 | 451.961 | 499.110 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 6834 | 406.0 | 18.387 | 19.779 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 6834 | 812.1 | 31.095 | 33.469 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 6834 | 812.1 | 30.232 | 34.034 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 6834 | 812.1 | 31.376 | 34.276 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1754 | 104.8 | 4.972 | 7.122 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1754 | 210.8 | 7.726 | 8.604 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1754 | 210.8 | 7.732 | 8.464 |
| Decagonal (20-fold) | decagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1754 | 210.8 | 7.987 | 9.140 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5720 | 314.7 | 40.898 | 47.598 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5720 | 629.8 | 52.883 | 55.952 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5720 | 629.8 | 50.330 | 51.625 |
| Socolar (12-fold) | socolar | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5720 | 629.8 | 49.555 | 61.447 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 541 | 30.1 | 4.432 | 6.123 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 541 | 61.0 | 4.918 | 6.530 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 541 | 61.0 | 5.031 | 5.896 |
| Socolar (12-fold) | socolar | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 541 | 61.0 | 4.986 | 6.021 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 148 | 8.6 | 1.458 | 1.473 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 148 | 17.4 | 1.713 | 2.621 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 148 | 17.4 | 1.687 | 1.708 |
| Socolar (12-fold) | socolar | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 148 | 17.4 | 1.682 | 1.685 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21588 | 1247.1 | 172.724 | 199.859 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21588 | 2487.8 | 224.370 | 256.039 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21588 | 2487.8 | 226.841 | 257.395 |
| Socolar (12-fold) | socolar | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21588 | 2487.8 | 223.517 | 242.422 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1923 | 111.6 | 14.273 | 19.234 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1923 | 224.6 | 17.087 | 18.236 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1923 | 224.6 | 16.565 | 17.995 |
| Socolar (12-fold) | socolar | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1923 | 224.6 | 16.752 | 18.660 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 535 | 31.4 | 4.199 | 4.250 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 535 | 63.9 | 5.007 | 5.026 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 535 | 63.9 | 4.967 | 6.047 |
| Socolar (12-fold) | socolar | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 535 | 63.9 | 5.059 | 6.596 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 85325 | 5208.9 | 727.686 | 803.096 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 85325 | 10373.4 | 1008.038 | 1053.831 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 85325 | 10373.4 | 1032.633 | 1054.958 |
| Socolar (12-fold) | socolar | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 85325 | 10373.4 | 1003.483 | 1043.057 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7584 | 460.9 | 63.030 | 92.222 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7584 | 921.8 | 69.483 | 76.345 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7584 | 921.8 | 73.140 | 80.191 |
| Socolar (12-fold) | socolar | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7584 | 921.8 | 69.967 | 82.532 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1923 | 118.3 | 13.721 | 15.852 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1923 | 238.2 | 18.314 | 19.618 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1923 | 238.2 | 16.912 | 18.483 |
| Socolar (12-fold) | socolar | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1923 | 238.2 | 17.171 | 19.366 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5674 | 229.7 | 8.976 | 11.154 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5674 | 457.4 | 14.896 | 17.298 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5674 | 457.4 | 15.338 | 16.866 |
| Tübingen triangle | tubingen-triangle | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5674 | 457.4 | 15.439 | 23.979 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 560 | 22.9 | 0.837 | 0.873 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 560 | 45.8 | 1.413 | 3.859 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 560 | 45.8 | 1.402 | 1.422 |
| Tübingen triangle | tubingen-triangle | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 560 | 45.8 | 1.417 | 1.489 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 158 | 6.7 | 0.303 | 0.309 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 158 | 13.4 | 0.599 | 4.315 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 158 | 13.4 | 0.455 | 0.476 |
| Tübingen triangle | tubingen-triangle | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 158 | 13.4 | 0.452 | 0.461 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21228 | 899.9 | 56.209 | 59.866 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21228 | 1786.8 | 87.562 | 91.991 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21228 | 1786.8 | 83.564 | 101.540 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21228 | 1786.8 | 83.755 | 102.035 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 82.0 | 2.265 | 5.523 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 163.7 | 4.477 | 6.989 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 163.7 | 4.596 | 7.585 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 163.7 | 4.473 | 5.077 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 514 | 22.2 | 0.843 | 3.794 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 514 | 44.3 | 1.438 | 1.777 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 514 | 44.3 | 1.367 | 4.158 |
| Tübingen triangle | tubingen-triangle | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 514 | 44.3 | 1.366 | 1.386 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83764 | 3742.5 | 180.120 | 211.929 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83764 | 7428.4 | 324.934 | 339.753 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83764 | 7428.4 | 316.269 | 337.973 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83764 | 7428.4 | 324.652 | 379.895 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7490 | 334.6 | 19.695 | 37.955 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7490 | 667.1 | 29.045 | 30.838 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7490 | 667.1 | 29.194 | 30.465 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7490 | 667.1 | 28.667 | 36.889 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1922 | 86.4 | 2.220 | 4.742 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1922 | 172.6 | 4.541 | 7.117 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1922 | 172.6 | 4.527 | 7.212 |
| Tübingen triangle | tubingen-triangle | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1922 | 172.6 | 4.487 | 7.368 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5604 | 960.6 | 32.119 | 37.142 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5604 | 2041.6 | 62.694 | 65.558 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5604 | 2041.6 | 64.295 | 71.498 |
| Hat monotile (einstein) | hat | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5604 | 2041.6 | 64.154 | 71.452 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 526 | 91.2 | 2.123 | 7.501 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 526 | 196.4 | 4.469 | 9.812 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 526 | 196.4 | 4.673 | 12.865 |
| Hat monotile (einstein) | hat | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 526 | 196.4 | 4.712 | 5.457 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 148 | 26.0 | 0.696 | 0.724 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 148 | 56.7 | 1.334 | 1.475 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 148 | 56.7 | 1.333 | 2.034 |
| Hat monotile (einstein) | hat | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 148 | 56.7 | 1.296 | 1.326 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21164 | 3817.4 | 141.823 | 172.708 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21164 | 8088.9 | 301.822 | 320.133 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21164 | 8088.9 | 309.905 | 361.830 |
| Hat monotile (einstein) | hat | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21164 | 8088.9 | 286.118 | 307.971 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1921 | 348.1 | 7.804 | 11.122 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1921 | 744.0 | 17.746 | 19.339 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1921 | 744.0 | 19.231 | 20.202 |
| Hat monotile (einstein) | hat | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1921 | 744.0 | 19.672 | 21.217 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 512 | 93.4 | 1.958 | 3.204 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 512 | 201.3 | 4.445 | 5.110 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 512 | 201.3 | 4.379 | 5.190 |
| Hat monotile (einstein) | hat | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 512 | 201.3 | 4.357 | 5.219 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83823 | 15989.5 | 607.377 | 700.720 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83823 | 33818.1 | 1252.199 | 1300.453 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83823 | 33818.1 | 1232.488 | 1377.073 |
| Hat monotile (einstein) | hat | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83823 | 33818.1 | 1244.528 | 1329.541 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7415 | 1415.2 | 46.922 | 47.762 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7415 | 3006.1 | 83.991 | 133.458 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7415 | 3006.1 | 81.450 | 84.355 |
| Hat monotile (einstein) | hat | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7415 | 3006.1 | 83.212 | 87.581 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1921 | 366.8 | 9.149 | 22.315 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1921 | 783.6 | 18.109 | 20.988 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1921 | 783.6 | 18.248 | 19.489 |
| Hat monotile (einstein) | hat | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1921 | 783.6 | 18.243 | 19.628 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5690 | 144.9 | 7.319 | 9.756 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5690 | 330.7 | 11.693 | 13.090 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5690 | 330.7 | 12.296 | 14.309 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5690 | 330.7 | 12.035 | 13.079 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 542 | 22.2 | 0.779 | 1.431 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 542 | 51.1 | 1.358 | 1.372 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 542 | 51.1 | 1.348 | 1.365 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 542 | 51.1 | 1.384 | 1.412 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 156 | 5.3 | 0.258 | 0.279 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 156 | 12.0 | 0.397 | 0.438 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 156 | 12.0 | 0.388 | 0.403 |
| Pinwheel (Conway–Radin) | pinwheel | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 156 | 12.0 | 0.391 | 0.396 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21230 | 902.3 | 35.721 | 42.905 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21230 | 2063.5 | 68.253 | 80.922 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21230 | 2063.5 | 68.287 | 81.493 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21230 | 2063.5 | 68.722 | 89.676 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1934 | 64.1 | 2.759 | 6.874 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1934 | 147.3 | 4.572 | 5.468 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1934 | 147.3 | 4.551 | 5.307 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1934 | 147.3 | 4.966 | 5.518 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 528 | 22.9 | 0.834 | 0.934 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 528 | 52.4 | 1.438 | 1.668 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 528 | 52.4 | 1.461 | 1.825 |
| Pinwheel (Conway–Radin) | pinwheel | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 528 | 52.4 | 1.389 | 2.051 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84068 | 2578.7 | 152.229 | 179.022 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84068 | 5886.3 | 288.588 | 310.361 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84068 | 5886.3 | 280.005 | 310.269 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84068 | 5886.3 | 285.441 | 328.012 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7468 | 335.4 | 13.279 | 35.202 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7468 | 768.4 | 22.560 | 24.931 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7468 | 768.4 | 22.329 | 25.222 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7468 | 768.4 | 23.501 | 25.000 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1934 | 68.6 | 2.905 | 5.921 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1934 | 157.8 | 4.758 | 7.959 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1934 | 157.8 | 4.953 | 7.670 |
| Pinwheel (Conway–Radin) | pinwheel | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1934 | 157.8 | 4.770 | 7.301 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5457 | 436.5 | 15.334 | 32.402 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5457 | 1089.6 | 27.342 | 27.619 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5457 | 1089.6 | 28.041 | 28.146 |
| Chair (L-tromino) | chair | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5457 | 1089.6 | 27.834 | 28.189 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 513 | 41.2 | 1.309 | 2.461 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 513 | 103.0 | 2.304 | 2.402 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 513 | 103.0 | 2.320 | 2.348 |
| Chair (L-tromino) | chair | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 513 | 103.0 | 2.292 | 2.658 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 133 | 10.9 | 0.434 | 0.441 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 133 | 27.1 | 0.694 | 0.703 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 133 | 27.1 | 0.694 | 1.085 |
| Chair (L-tromino) | chair | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 133 | 27.1 | 0.680 | 0.709 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21149 | 1776.0 | 90.633 | 117.709 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21149 | 4429.2 | 154.495 | 173.538 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21149 | 4429.2 | 149.287 | 185.834 |
| Chair (L-tromino) | chair | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21149 | 4429.2 | 158.192 | 169.634 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1865 | 156.6 | 4.866 | 18.584 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1865 | 391.5 | 9.568 | 9.906 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1865 | 391.5 | 9.118 | 10.352 |
| Chair (L-tromino) | chair | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1865 | 391.5 | 9.126 | 10.690 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 493 | 41.2 | 1.369 | 1.947 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 493 | 103.4 | 2.384 | 2.418 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 493 | 103.4 | 2.376 | 2.400 |
| Chair (L-tromino) | chair | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 493 | 103.4 | 2.419 | 2.755 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83753 | 7411.7 | 356.307 | 386.960 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83753 | 18461.5 | 720.458 | 749.768 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83753 | 18461.5 | 724.775 | 743.139 |
| Chair (L-tromino) | chair | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83753 | 18461.5 | 755.223 | 782.291 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7353 | 651.2 | 23.864 | 26.032 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7353 | 1624.9 | 49.708 | 51.322 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7353 | 1624.9 | 49.416 | 51.045 |
| Chair (L-tromino) | chair | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7353 | 1624.9 | 47.735 | 78.899 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1865 | 164.7 | 5.380 | 10.680 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1865 | 411.5 | 10.231 | 11.439 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1865 | 411.5 | 9.771 | 11.988 |
| Chair (L-tromino) | chair | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1865 | 411.5 | 9.561 | 11.604 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5596 | 372.8 | 14.336 | 15.657 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5596 | 848.1 | 26.360 | 28.129 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5596 | 848.1 | 26.749 | 27.863 |
| Sphinx hexiamond | sphinx | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5596 | 848.1 | 25.676 | 27.522 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 544 | 36.5 | 1.299 | 4.269 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 544 | 83.6 | 2.171 | 3.150 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 544 | 83.6 | 2.176 | 2.378 |
| Sphinx hexiamond | sphinx | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 544 | 83.6 | 2.219 | 3.152 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 159 | 10.9 | 0.420 | 0.424 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 159 | 24.7 | 0.696 | 0.700 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 159 | 24.7 | 0.690 | 0.696 |
| Sphinx hexiamond | sphinx | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 159 | 24.7 | 0.694 | 0.698 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21220 | 1485.8 | 80.772 | 92.220 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21220 | 3376.6 | 137.256 | 145.135 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21220 | 3376.6 | 144.739 | 148.237 |
| Sphinx hexiamond | sphinx | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21220 | 3376.6 | 140.417 | 152.936 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1926 | 135.5 | 4.642 | 11.596 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1926 | 308.6 | 8.346 | 9.233 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1926 | 308.6 | 8.356 | 9.207 |
| Sphinx hexiamond | sphinx | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1926 | 308.6 | 8.478 | 9.947 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 509 | 36.1 | 1.245 | 2.141 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 509 | 82.2 | 2.125 | 2.176 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 509 | 82.2 | 2.129 | 2.536 |
| Sphinx hexiamond | sphinx | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 509 | 82.2 | 2.118 | 2.171 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84053 | 6217.1 | 309.839 | 382.965 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84053 | 14109.7 | 591.749 | 609.172 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84053 | 14109.7 | 602.124 | 626.810 |
| Sphinx hexiamond | sphinx | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84053 | 14109.7 | 609.975 | 647.409 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7485 | 554.6 | 18.571 | 21.767 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7485 | 1260.0 | 38.030 | 40.426 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7485 | 1260.0 | 38.506 | 40.188 |
| Sphinx hexiamond | sphinx | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7485 | 1260.0 | 36.940 | 39.487 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1926 | 142.6 | 4.502 | 4.962 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1926 | 324.6 | 8.142 | 8.969 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1926 | 324.6 | 8.117 | 9.423 |
| Sphinx hexiamond | sphinx | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1926 | 324.6 | 8.335 | 9.922 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5882 | 701.4 | 20.304 | 23.388 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5882 | 1406.1 | 44.442 | 46.004 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5882 | 1406.1 | 44.411 | 44.789 |
| Voderberg spiral | voderberg | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5882 | 1406.1 | 41.995 | 43.582 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 610 | 73.6 | 2.384 | 3.529 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 610 | 148.8 | 4.302 | 5.123 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 610 | 148.8 | 4.325 | 5.375 |
| Voderberg spiral | voderberg | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 610 | 148.8 | 4.336 | 5.611 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 172 | 21.3 | 0.881 | 0.932 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 172 | 43.2 | 1.379 | 1.403 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 172 | 43.2 | 1.376 | 1.399 |
| Voderberg spiral | voderberg | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 172 | 43.2 | 1.382 | 1.932 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21532 | 2701.0 | 106.484 | 152.276 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21532 | 5404.5 | 207.553 | 219.421 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21532 | 5404.5 | 206.067 | 235.559 |
| Voderberg spiral | voderberg | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21532 | 5404.5 | 207.777 | 235.180 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2020 | 254.8 | 7.478 | 12.169 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2020 | 512.7 | 14.601 | 17.708 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2020 | 512.7 | 16.300 | 18.088 |
| Voderberg spiral | voderberg | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2020 | 512.7 | 15.217 | 16.660 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 590 | 75.1 | 2.303 | 3.201 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 590 | 151.8 | 4.276 | 4.772 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 590 | 151.8 | 4.405 | 5.133 |
| Voderberg spiral | voderberg | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 590 | 151.8 | 4.384 | 6.156 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84620 | 11202.1 | 474.673 | 531.156 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84620 | 22386.5 | 889.061 | 979.099 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84620 | 22386.5 | 900.243 | 922.098 |
| Voderberg spiral | voderberg | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84620 | 22386.5 | 883.669 | 912.633 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7662 | 1015.1 | 32.677 | 60.682 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7662 | 2034.6 | 65.860 | 66.939 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7662 | 2034.6 | 64.484 | 68.057 |
| Voderberg spiral | voderberg | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7662 | 2034.6 | 64.406 | 85.781 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2020 | 268.3 | 7.851 | 8.416 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2020 | 539.8 | 15.914 | 16.722 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2020 | 539.8 | 15.132 | 16.762 |
| Voderberg spiral | voderberg | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2020 | 539.8 | 15.137 | 17.053 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 9219 | 374.8 | 24.466 | 27.437 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 9219 | 748.0 | 34.768 | 41.323 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 9219 | 748.0 | 34.528 | 46.543 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 9219 | 748.0 | 33.649 | 38.858 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 453 | 19.8 | 0.680 | 3.942 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 453 | 39.4 | 1.175 | 1.184 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 453 | 39.4 | 1.177 | 1.189 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 453 | 39.4 | 1.175 | 3.789 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 253 | 11.1 | 0.504 | 0.509 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 253 | 22.0 | 0.779 | 0.792 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 253 | 22.0 | 0.775 | 0.793 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 253 | 22.0 | 0.780 | 0.862 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 27226 | 1164.6 | 65.580 | 81.898 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 27226 | 2318.9 | 108.945 | 122.606 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 27226 | 2318.9 | 114.198 | 130.256 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 27226 | 2318.9 | 113.228 | 128.299 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1989 | 86.2 | 10.039 | 17.899 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1989 | 173.7 | 10.480 | 11.218 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1989 | 173.7 | 10.322 | 11.165 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1989 | 173.7 | 10.169 | 11.637 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 451 | 20.4 | 0.647 | 0.664 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 451 | 40.6 | 1.177 | 1.668 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 451 | 40.6 | 1.157 | 1.162 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 451 | 40.6 | 1.171 | 1.292 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 80000 | 3600.9 | 338.016 | 397.672 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 80000 | 7186.5 | 489.525 | 545.916 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 80000 | 7186.5 | 477.627 | 571.246 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 80000 | 7186.5 | 486.174 | 558.588 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 13451 | 606.1 | 26.387 | 27.631 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 13451 | 1208.9 | 47.589 | 51.968 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 13451 | 1208.9 | 45.651 | 49.814 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 13451 | 1208.9 | 45.789 | 48.403 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1989 | 90.2 | 7.731 | 9.093 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1989 | 181.8 | 10.189 | 10.752 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1989 | 181.8 | 10.185 | 11.118 |
| Shuriken tiling (12-fold) | shuriken-supertile-12 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1989 | 181.8 | 10.441 | 11.156 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5704 | 1092.2 | 27.531 | 28.485 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5704 | 2230.3 | 68.213 | 82.592 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5704 | 2230.3 | 60.243 | 62.329 |
| Squiral | squiral | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5704 | 2230.3 | 62.593 | 66.659 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 504 | 99.9 | 1.816 | 6.910 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 504 | 206.3 | 4.498 | 4.531 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 504 | 206.3 | 4.560 | 4.619 |
| Squiral | squiral | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 504 | 206.3 | 4.558 | 5.713 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 140 | 27.9 | 0.549 | 0.593 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 140 | 56.8 | 1.243 | 2.080 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 140 | 56.8 | 1.240 | 1.261 |
| Squiral | squiral | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 140 | 56.8 | 1.219 | 1.234 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21340 | 4321.1 | 141.121 | 148.448 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21340 | 8785.3 | 299.051 | 332.917 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21340 | 8785.3 | 296.079 | 314.295 |
| Squiral | squiral | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21340 | 8785.3 | 290.382 | 310.290 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1914 | 398.8 | 7.253 | 9.843 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1914 | 821.2 | 19.107 | 20.678 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1914 | 821.2 | 18.981 | 22.253 |
| Squiral | squiral | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1914 | 821.2 | 19.793 | 21.544 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 540 | 112.8 | 1.897 | 3.279 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 540 | 229.5 | 4.926 | 6.018 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 540 | 229.5 | 4.874 | 4.899 |
| Squiral | squiral | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 540 | 229.5 | 4.870 | 4.925 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84148 | 18084.4 | 566.264 | 707.630 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84148 | 36756.0 | 1310.248 | 1418.542 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84148 | 36756.0 | 1319.486 | 1392.224 |
| Squiral | squiral | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84148 | 36756.0 | 1290.479 | 1403.429 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7410 | 1636.6 | 38.131 | 40.869 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7410 | 3348.5 | 90.606 | 95.598 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7410 | 3348.5 | 88.172 | 88.756 |
| Squiral | squiral | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7410 | 3348.5 | 87.882 | 88.235 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1914 | 422.8 | 7.450 | 13.464 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1914 | 870.4 | 19.881 | 22.409 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1914 | 870.4 | 19.488 | 21.565 |
| Squiral | squiral | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1914 | 870.4 | 20.110 | 21.921 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5796 | 137.0 | 4.556 | 5.579 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5796 | 270.6 | 8.847 | 9.948 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5796 | 270.6 | 8.840 | 9.937 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5796 | 270.6 | 8.851 | 10.146 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 532 | 13.1 | 0.372 | 0.384 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 532 | 25.7 | 0.760 | 0.774 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 532 | 25.7 | 0.759 | 0.765 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 532 | 25.7 | 0.757 | 0.799 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 164 | 4.5 | 0.130 | 0.132 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 164 | 8.7 | 0.249 | 1.048 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 164 | 8.7 | 0.244 | 0.251 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 164 | 8.7 | 0.245 | 0.255 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21644 | 555.3 | 21.810 | 23.010 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21644 | 1097.1 | 45.351 | 48.084 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21644 | 1097.1 | 41.327 | 42.057 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21644 | 1097.1 | 40.995 | 42.591 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1888 | 48.8 | 1.869 | 1.932 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1888 | 96.4 | 2.698 | 3.799 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1888 | 96.4 | 2.698 | 2.703 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1888 | 96.4 | 2.683 | 4.484 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 496 | 13.2 | 0.369 | 0.377 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 496 | 26.0 | 0.728 | 0.737 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 496 | 26.0 | 0.723 | 0.731 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 496 | 26.0 | 0.726 | 0.736 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84752 | 2367.2 | 102.207 | 138.867 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84752 | 4673.6 | 205.778 | 244.280 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84752 | 4673.6 | 204.447 | 236.491 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84752 | 4673.6 | 206.653 | 232.513 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7360 | 206.1 | 5.747 | 8.393 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7360 | 407.6 | 12.062 | 13.627 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7360 | 407.6 | 11.482 | 13.841 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7360 | 407.6 | 11.771 | 13.395 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1888 | 53.3 | 1.269 | 1.294 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1888 | 105.5 | 2.714 | 3.420 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1888 | 105.5 | 2.697 | 3.333 |
| Jeandel–Rao 11 Wang tiles | jeandel-rao | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1888 | 105.5 | 2.679 | 2.689 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5990 | 242.1 | 7.461 | 11.934 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5990 | 505.1 | 13.912 | 18.195 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5990 | 505.1 | 13.953 | 19.551 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5990 | 505.1 | 14.083 | 18.083 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 581 | 24.0 | 0.704 | 0.715 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 581 | 50.6 | 1.297 | 1.427 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 581 | 50.6 | 1.288 | 1.311 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 581 | 50.6 | 1.282 | 1.293 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 174 | 7.6 | 0.305 | 3.313 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 174 | 16.0 | 0.484 | 0.507 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 174 | 16.0 | 0.468 | 0.493 |
| Danzer sevenfold triangles | danzer-sevenfold | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 174 | 16.0 | 0.488 | 0.543 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 22468 | 954.9 | 36.422 | 45.397 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 22468 | 1987.3 | 74.173 | 86.166 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 22468 | 1987.3 | 75.354 | 88.770 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 22468 | 1987.3 | 72.627 | 82.596 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2033 | 86.9 | 2.675 | 7.046 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2033 | 181.5 | 4.972 | 13.612 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2033 | 181.5 | 5.052 | 6.376 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2033 | 181.5 | 4.943 | 5.725 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 551 | 24.0 | 0.684 | 0.692 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 551 | 50.7 | 1.275 | 1.293 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 551 | 50.7 | 1.286 | 1.320 |
| Danzer sevenfold triangles | danzer-sevenfold | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 551 | 50.7 | 1.309 | 1.721 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 88769 | 3977.6 | 170.175 | 193.923 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 88769 | 8264.9 | 337.620 | 375.444 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 88769 | 8264.9 | 345.200 | 368.285 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 88769 | 8264.9 | 336.083 | 382.533 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7874 | 353.0 | 12.318 | 15.428 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7874 | 736.6 | 22.043 | 24.996 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7874 | 736.6 | 22.373 | 23.948 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7874 | 736.6 | 22.609 | 23.385 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2033 | 91.6 | 2.521 | 4.539 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2033 | 191.5 | 4.851 | 5.512 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2033 | 191.5 | 4.866 | 5.729 |
| Danzer sevenfold triangles | danzer-sevenfold | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2033 | 191.5 | 4.895 | 5.918 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5572 | 297.2 | 19.138 | 20.466 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5572 | 594.2 | 28.837 | 42.432 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5572 | 594.2 | 27.291 | 29.466 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5572 | 594.2 | 27.584 | 29.265 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 520 | 28.1 | 1.865 | 1.919 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 520 | 57.2 | 2.577 | 3.690 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 520 | 57.2 | 2.571 | 2.680 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 520 | 57.2 | 2.571 | 3.048 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 144 | 8.0 | 0.604 | 0.615 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 144 | 16.3 | 0.793 | 0.805 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 144 | 16.3 | 0.793 | 0.797 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 144 | 16.3 | 0.799 | 0.803 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21198 | 1190.0 | 90.740 | 114.566 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21198 | 2373.2 | 130.081 | 142.223 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21198 | 2373.2 | 131.154 | 145.183 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21198 | 2373.2 | 129.739 | 148.192 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1890 | 106.8 | 6.115 | 10.809 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1890 | 215.0 | 9.007 | 10.919 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1890 | 215.0 | 9.057 | 10.097 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1890 | 215.0 | 9.058 | 9.851 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 500 | 28.4 | 2.017 | 2.829 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 500 | 57.8 | 2.705 | 2.833 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 500 | 57.8 | 2.742 | 3.270 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 500 | 57.8 | 2.707 | 2.732 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83716 | 4967.2 | 415.303 | 472.840 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83716 | 9888.9 | 644.274 | 672.588 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83716 | 9888.9 | 639.947 | 665.214 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83716 | 9888.9 | 631.544 | 658.260 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7348 | 434.7 | 27.863 | 31.850 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7348 | 869.0 | 39.562 | 42.115 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7348 | 869.0 | 39.893 | 42.530 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7348 | 869.0 | 41.228 | 43.342 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1890 | 112.4 | 6.122 | 9.665 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1890 | 226.4 | 9.273 | 10.658 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1890 | 226.4 | 9.160 | 10.679 |
| Watanabe–Ito–Soma eightfold | watanabe-ito-soma-eightfold | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1890 | 226.4 | 9.074 | 10.620 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5704 | 177.6 | 5.097 | 9.132 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5704 | 352.7 | 11.503 | 12.518 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5704 | 352.7 | 11.192 | 12.888 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5704 | 352.7 | 11.600 | 28.529 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 504 | 16.0 | 0.572 | 0.769 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 504 | 31.9 | 0.972 | 1.090 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 504 | 31.9 | 1.018 | 2.006 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 504 | 31.9 | 0.966 | 0.987 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 140 | 4.7 | 0.162 | 0.170 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 140 | 9.4 | 0.296 | 0.306 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 140 | 9.4 | 0.293 | 0.345 |
| Rule 90 cellular automaton | rule-90 | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 140 | 9.4 | 0.291 | 0.321 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21340 | 722.4 | 35.112 | 47.076 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21340 | 1432.8 | 68.443 | 75.232 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21340 | 1432.8 | 61.935 | 74.573 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21340 | 1432.8 | 63.467 | 75.439 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 62.9 | 1.567 | 5.050 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 125.5 | 3.365 | 4.131 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 125.5 | 3.354 | 3.872 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 125.5 | 3.389 | 4.006 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 480 | 16.6 | 0.455 | 0.458 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 480 | 33.1 | 0.904 | 0.944 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 480 | 33.1 | 0.911 | 1.268 |
| Rule 90 cellular automaton | rule-90 | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 480 | 33.1 | 0.891 | 0.901 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84148 | 3106.5 | 149.600 | 219.267 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84148 | 6156.9 | 294.371 | 368.118 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84148 | 6156.9 | 295.036 | 367.954 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84148 | 6156.9 | 296.575 | 350.445 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7296 | 269.7 | 6.438 | 8.122 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7296 | 536.4 | 16.313 | 18.484 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7296 | 536.4 | 15.483 | 17.641 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7296 | 536.4 | 15.840 | 17.404 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 68.9 | 1.576 | 1.604 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 137.5 | 3.466 | 4.390 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 137.5 | 3.472 | 4.457 |
| Rule 90 cellular automaton | rule-90 | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 137.5 | 3.486 | 4.144 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5704 | 481.9 | 38.860 | 63.908 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5704 | 1222.1 | 56.451 | 81.131 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5704 | 1222.1 | 54.784 | 86.575 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5704 | 1222.1 | 51.426 | 87.233 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 504 | 43.0 | 3.010 | 5.844 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 504 | 108.5 | 3.635 | 6.098 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 504 | 108.5 | 3.700 | 7.387 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 504 | 108.5 | 4.197 | 13.092 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 140 | 8.9 | 0.984 | 1.086 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 140 | 21.6 | 1.128 | 2.125 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 140 | 21.6 | 1.138 | 1.195 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 140 | 21.6 | 1.047 | 2.094 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21340 | 1921.5 | 220.856 | 300.570 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21340 | 4869.4 | 270.913 | 390.517 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21340 | 4869.4 | 316.173 | 363.599 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21340 | 4869.4 | 305.601 | 358.384 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 167.4 | 15.018 | 16.349 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 423.9 | 18.366 | 20.322 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 423.9 | 19.436 | 20.356 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 423.9 | 19.416 | 20.578 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 480 | 32.3 | 2.443 | 4.358 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 480 | 79.9 | 2.972 | 4.199 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 480 | 79.9 | 3.007 | 3.930 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 480 | 79.9 | 2.961 | 5.155 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84148 | 8097.2 | 1058.148 | 1316.567 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84148 | 20505.5 | 1247.825 | 1436.982 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84148 | 20505.5 | 1217.341 | 1561.775 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84148 | 20505.5 | 1187.901 | 1350.209 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7296 | 702.2 | 79.805 | 115.038 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7296 | 1777.8 | 97.714 | 128.734 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7296 | 1777.8 | 97.466 | 138.020 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7296 | 1777.8 | 95.095 | 117.319 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1856 | 135.4 | 14.094 | 14.923 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1856 | 336.4 | 16.173 | 17.765 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1856 | 336.4 | 17.326 | 17.924 |
| Seeded binary-tree maze | seeded-binary-tree-maze | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1856 | 336.4 | 17.398 | 18.073 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5649 | 228.7 | 130.291 | 146.284 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5649 | 455.3 | 130.188 | 144.967 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5649 | 455.3 | 131.718 | 134.477 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5649 | 455.3 | 137.898 | 149.690 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 550 | 22.7 | 19.803 | 20.222 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 550 | 45.5 | 20.196 | 21.791 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 550 | 45.5 | 19.708 | 21.325 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 550 | 45.5 | 19.935 | 21.867 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 151 | 6.6 | 10.262 | 12.213 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 151 | 13.2 | 10.631 | 11.449 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 151 | 13.2 | 10.229 | 11.141 |
| Seeded Delaunay triangulation | seeded-delaunay | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 151 | 13.2 | 10.214 | 11.009 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21170 | 899.2 | 451.321 | 476.491 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21170 | 1786.7 | 473.574 | 490.513 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21170 | 1786.7 | 479.713 | 488.273 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21170 | 1786.7 | 483.243 | 507.914 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1943 | 83.0 | 51.875 | 52.865 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1943 | 165.9 | 54.944 | 56.034 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1943 | 165.9 | 54.364 | 55.233 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1943 | 165.9 | 54.601 | 55.406 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 535 | 23.3 | 20.537 | 20.824 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 535 | 46.7 | 21.069 | 21.482 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 535 | 46.7 | 21.258 | 21.682 |
| Seeded Delaunay triangulation | seeded-delaunay | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 535 | 46.7 | 21.800 | 22.618 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83646 | 3745.1 | 1738.549 | 1837.652 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83646 | 7433.0 | 1913.328 | 1953.999 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83646 | 7433.0 | 1882.060 | 1943.435 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83646 | 7433.0 | 1877.932 | 1911.203 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7467 | 334.7 | 176.786 | 192.202 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7467 | 666.6 | 182.281 | 199.008 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7467 | 666.6 | 189.496 | 206.112 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7467 | 666.6 | 183.270 | 201.646 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1943 | 87.3 | 52.675 | 54.438 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1943 | 174.6 | 54.670 | 56.269 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1943 | 174.6 | 53.498 | 54.820 |
| Seeded Delaunay triangulation | seeded-delaunay | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1943 | 174.6 | 56.109 | 65.551 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5945 | 319.4 | 6.740 | 10.346 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5945 | 737.7 | 16.387 | 29.075 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5945 | 737.7 | 15.683 | 17.784 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5945 | 737.7 | 15.810 | 18.100 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 577 | 31.2 | 0.809 | 0.811 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 577 | 71.4 | 1.581 | 3.540 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 577 | 71.4 | 1.560 | 1.568 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 577 | 71.4 | 2.091 | 6.192 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 160 | 8.8 | 0.257 | 0.266 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 160 | 20.2 | 0.477 | 0.530 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 160 | 20.2 | 0.458 | 0.471 |
| Seeded quadtree mosaic | seeded-quadtree | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 160 | 20.2 | 0.464 | 1.259 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 22103 | 1245.0 | 40.926 | 52.026 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 22103 | 2877.6 | 85.406 | 118.318 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 22103 | 2877.6 | 83.092 | 88.611 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 22103 | 2877.6 | 83.999 | 92.913 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2071 | 116.4 | 2.252 | 3.303 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2071 | 266.2 | 5.516 | 6.166 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2071 | 266.2 | 5.534 | 7.067 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2071 | 266.2 | 5.563 | 6.629 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 555 | 30.6 | 0.795 | 1.571 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 555 | 69.5 | 1.560 | 1.611 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 555 | 69.5 | 1.555 | 2.267 |
| Seeded quadtree mosaic | seeded-quadtree | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 555 | 69.5 | 1.543 | 1.555 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 85913 | 5109.2 | 178.913 | 260.931 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 85913 | 11822.9 | 396.343 | 436.323 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 85913 | 11822.9 | 396.139 | 451.850 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 85913 | 11822.9 | 415.144 | 476.095 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7735 | 455.7 | 12.621 | 15.476 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7735 | 1053.0 | 26.363 | 28.773 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7735 | 1053.0 | 25.929 | 26.951 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7735 | 1053.0 | 25.174 | 28.219 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 2071 | 119.5 | 2.305 | 5.537 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 2071 | 272.9 | 5.789 | 7.318 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 2071 | 272.9 | 5.595 | 7.560 |
| Seeded quadtree mosaic | seeded-quadtree | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 2071 | 272.9 | 5.631 | 6.690 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5709 | 270.2 | 96.781 | 148.956 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5709 | 1488.2 | 114.698 | 146.457 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5709 | 1488.2 | 122.018 | 141.234 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5709 | 1488.2 | 115.656 | 136.601 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 506 | 25.9 | 8.452 | 14.680 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 506 | 135.9 | 12.977 | 27.811 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 506 | 135.9 | 10.494 | 20.596 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 506 | 135.9 | 11.157 | 18.310 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 141 | 9.4 | 3.615 | 10.444 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 141 | 40.1 | 4.275 | 5.315 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 141 | 40.1 | 4.024 | 11.219 |
| Seeded Truchet mosaic | seeded-truchet | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 141 | 40.1 | 4.077 | 10.198 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21347 | 1138.3 | 414.944 | 498.662 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21347 | 5960.2 | 480.289 | 583.750 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21347 | 5960.2 | 485.076 | 555.398 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21347 | 5960.2 | 473.345 | 504.065 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1862 | 106.9 | 40.242 | 59.265 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1862 | 534.8 | 43.913 | 65.110 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1862 | 534.8 | 40.212 | 41.376 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1862 | 534.8 | 41.033 | 43.376 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 484 | 25.6 | 8.315 | 15.850 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 484 | 136.8 | 12.064 | 27.902 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 484 | 136.8 | 10.463 | 17.238 |
| Seeded Truchet mosaic | seeded-truchet | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 484 | 136.8 | 10.128 | 16.869 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 84171 | 4764.3 | 1684.779 | 2005.935 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 84171 | 24956.8 | 2060.641 | 2519.092 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 84171 | 24956.8 | 2026.351 | 2203.669 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 84171 | 24956.8 | 2079.038 | 2289.583 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7310 | 401.7 | 129.011 | 192.287 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7310 | 2183.4 | 160.344 | 172.385 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7310 | 2183.4 | 158.424 | 188.791 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7310 | 2183.4 | 151.779 | 168.920 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1862 | 112.5 | 33.813 | 54.217 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1862 | 566.4 | 37.287 | 53.529 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1862 | 566.4 | 39.941 | 44.509 |
| Seeded Truchet mosaic | seeded-truchet | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1862 | 566.4 | 40.532 | 49.368 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 5591 | 446.3 | 240.607 | 262.546 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 5591 | 896.5 | 256.060 | 278.295 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 5591 | 896.5 | 252.377 | 270.240 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 5591 | 896.5 | 250.775 | 261.701 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 526 | 42.6 | 29.726 | 30.859 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 526 | 87.0 | 30.623 | 31.689 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 526 | 87.0 | 30.753 | 31.959 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 526 | 87.0 | 31.820 | 33.100 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 148 | 12.3 | 11.502 | 13.136 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 148 | 25.5 | 12.924 | 14.314 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 148 | 25.5 | 12.115 | 13.333 |
| Seeded Voronoi mosaic | seeded-voronoi | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 148 | 25.5 | 11.903 | 13.294 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 21025 | 1764.6 | 951.855 | 973.247 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 21025 | 3532.1 | 1015.305 | 1045.553 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 21025 | 3532.1 | 1018.981 | 1059.158 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 21025 | 3532.1 | 1015.664 | 1060.737 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1912 | 161.4 | 92.652 | 95.141 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1912 | 326.3 | 96.551 | 98.232 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1912 | 326.3 | 100.924 | 115.623 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1912 | 326.3 | 97.880 | 101.033 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 498 | 42.7 | 28.817 | 29.315 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 498 | 87.2 | 29.491 | 30.355 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 498 | 87.2 | 29.735 | 31.094 |
| Seeded Voronoi mosaic | seeded-voronoi | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 498 | 87.2 | 30.512 | 41.634 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Patch | 83557 | 7402.0 | 3858.148 | 3885.065 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Patch | 83557 | 14781.8 | 4097.912 | 4165.817 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Patch | 83557 | 14781.8 | 4152.672 | 4257.400 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Patch | 83557 | 14781.8 | 4092.968 | 4206.860 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Patch | 7359 | 652.7 | 346.331 | 375.295 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Patch | 7359 | 1310.9 | 371.839 | 389.398 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Patch | 7359 | 1310.9 | 348.564 | 380.669 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Patch | 7359 | 1310.9 | 356.189 | 387.425 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Patch | 1912 | 170.1 | 91.724 | 93.398 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Patch | 1912 | 344.0 | 96.485 | 110.519 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Patch | 1912 | 344.0 | 96.369 | 98.462 |
| Seeded Voronoi mosaic | seeded-voronoi | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Patch | 1912 | 344.0 | 96.898 | 112.631 |
| Triangular tiling | triangular | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.2 | 0.027 | 0.040 |
| Triangular tiling | triangular | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 1.9 | 0.050 | 0.074 |
| Triangular tiling | triangular | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 1.9 | 0.035 | 0.038 |
| Triangular tiling | triangular | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 1.9 | 0.035 | 0.050 |
| Triangular tiling | triangular | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.2 | 0.018 | 0.021 |
| Triangular tiling | triangular | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 2.1 | 0.034 | 0.038 |
| Triangular tiling | triangular | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 2.1 | 0.034 | 0.043 |
| Triangular tiling | triangular | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 2.1 | 0.033 | 0.036 |
| Triangular tiling | triangular | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.3 | 0.018 | 0.021 |
| Triangular tiling | triangular | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 2.2 | 0.036 | 0.040 |
| Triangular tiling | triangular | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 2.2 | 0.036 | 0.045 |
| Triangular tiling | triangular | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 2.2 | 0.035 | 0.037 |
| Triangular tiling | triangular | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.2 | 0.018 | 0.020 |
| Triangular tiling | triangular | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 2.0 | 0.034 | 0.036 |
| Triangular tiling | triangular | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 2.0 | 0.033 | 0.039 |
| Triangular tiling | triangular | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 2.0 | 0.033 | 0.035 |
| Triangular tiling | triangular | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.2 | 0.018 | 0.019 |
| Triangular tiling | triangular | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.1 | 0.034 | 0.036 |
| Triangular tiling | triangular | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.1 | 0.033 | 0.047 |
| Triangular tiling | triangular | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.1 | 0.033 | 0.035 |
| Triangular tiling | triangular | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.3 | 0.018 | 0.019 |
| Triangular tiling | triangular | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 2.2 | 0.037 | 0.044 |
| Triangular tiling | triangular | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 2.2 | 0.036 | 0.042 |
| Triangular tiling | triangular | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 2.2 | 0.035 | 0.037 |
| Triangular tiling | triangular | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.2 | 0.018 | 0.019 |
| Triangular tiling | triangular | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 2.0 | 0.033 | 0.037 |
| Triangular tiling | triangular | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 2.0 | 0.034 | 0.043 |
| Triangular tiling | triangular | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 2.0 | 0.034 | 0.035 |
| Triangular tiling | triangular | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.2 | 0.018 | 0.020 |
| Triangular tiling | triangular | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 2.1 | 0.035 | 0.039 |
| Triangular tiling | triangular | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 2.1 | 0.034 | 0.067 |
| Triangular tiling | triangular | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 2.1 | 0.034 | 0.036 |
| Triangular tiling | triangular | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.3 | 0.018 | 0.019 |
| Triangular tiling | triangular | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.2 | 0.036 | 0.040 |
| Triangular tiling | triangular | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.2 | 0.035 | 0.049 |
| Triangular tiling | triangular | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.2 | 0.035 | 0.036 |
| Square tiling | square | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.0 | 0.012 | 0.014 |
| Square tiling | square | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 1.5 | 0.021 | 0.023 |
| Square tiling | square | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 1.5 | 0.021 | 0.022 |
| Square tiling | square | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 1.5 | 0.021 | 0.025 |
| Square tiling | square | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.0 | 0.012 | 0.013 |
| Square tiling | square | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 1.6 | 0.022 | 0.025 |
| Square tiling | square | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 1.6 | 0.022 | 0.023 |
| Square tiling | square | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 1.6 | 0.022 | 0.024 |
| Square tiling | square | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.0 | 0.012 | 0.013 |
| Square tiling | square | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 1.6 | 0.025 | 0.028 |
| Square tiling | square | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 1.6 | 0.024 | 0.026 |
| Square tiling | square | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 1.6 | 0.025 | 0.027 |
| Square tiling | square | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.0 | 0.012 | 0.012 |
| Square tiling | square | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 1.5 | 0.021 | 0.021 |
| Square tiling | square | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 1.5 | 0.021 | 0.028 |
| Square tiling | square | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 1.5 | 0.021 | 0.023 |
| Square tiling | square | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.0 | 0.012 | 0.013 |
| Square tiling | square | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.6 | 0.023 | 0.026 |
| Square tiling | square | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.6 | 0.022 | 0.023 |
| Square tiling | square | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.6 | 0.022 | 0.023 |
| Square tiling | square | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.0 | 0.012 | 0.021 |
| Square tiling | square | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 1.6 | 0.024 | 0.027 |
| Square tiling | square | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 1.6 | 0.024 | 0.025 |
| Square tiling | square | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 1.6 | 0.024 | 0.025 |
| Square tiling | square | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.0 | 0.012 | 0.013 |
| Square tiling | square | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 1.5 | 0.021 | 0.024 |
| Square tiling | square | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 1.5 | 0.020 | 0.028 |
| Square tiling | square | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 1.5 | 0.020 | 0.022 |
| Square tiling | square | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.0 | 0.012 | 0.013 |
| Square tiling | square | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 1.6 | 0.023 | 0.024 |
| Square tiling | square | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 1.6 | 0.023 | 0.025 |
| Square tiling | square | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 1.6 | 0.022 | 0.023 |
| Square tiling | square | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.0 | 0.012 | 0.013 |
| Square tiling | square | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.6 | 0.024 | 0.025 |
| Square tiling | square | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.6 | 0.024 | 0.026 |
| Square tiling | square | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.6 | 0.024 | 0.025 |
| Hexagonal tiling | hexagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.0 | 0.012 | 0.014 |
| Hexagonal tiling | hexagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 1.6 | 0.021 | 0.023 |
| Hexagonal tiling | hexagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 1.6 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 1.6 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.0 | 0.011 | 0.013 |
| Hexagonal tiling | hexagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 1.7 | 0.020 | 0.023 |
| Hexagonal tiling | hexagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 1.7 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 1.7 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.0 | 0.010 | 0.012 |
| Hexagonal tiling | hexagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 1.8 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 1.8 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 1.8 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.0 | 0.012 | 0.013 |
| Hexagonal tiling | hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 1.6 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 1.6 | 0.020 | 0.028 |
| Hexagonal tiling | hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 1.6 | 0.021 | 0.024 |
| Hexagonal tiling | hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.0 | 0.011 | 0.013 |
| Hexagonal tiling | hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.7 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.7 | 0.020 | 0.020 |
| Hexagonal tiling | hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.7 | 0.020 | 0.023 |
| Hexagonal tiling | hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.0 | 0.010 | 0.012 |
| Hexagonal tiling | hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 1.8 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 1.8 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 1.8 | 0.020 | 0.020 |
| Hexagonal tiling | hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.0 | 0.012 | 0.012 |
| Hexagonal tiling | hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 1.6 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 1.6 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 1.6 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.0 | 0.011 | 0.012 |
| Hexagonal tiling | hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 1.7 | 0.020 | 0.022 |
| Hexagonal tiling | hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 1.7 | 0.020 | 0.020 |
| Hexagonal tiling | hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 1.7 | 0.020 | 0.020 |
| Hexagonal tiling | hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.0 | 0.010 | 0.012 |
| Hexagonal tiling | hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.8 | 0.020 | 0.028 |
| Hexagonal tiling | hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.8 | 0.020 | 0.021 |
| Hexagonal tiling | hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.8 | 0.020 | 0.020 |
| Trihexagonal tiling | trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.4 | 0.023 | 0.040 |
| Trihexagonal tiling | trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 2.6 | 0.042 | 0.046 |
| Trihexagonal tiling | trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 2.6 | 0.041 | 0.043 |
| Trihexagonal tiling | trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 2.6 | 0.041 | 0.044 |
| Trihexagonal tiling | trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.5 | 0.022 | 0.024 |
| Trihexagonal tiling | trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 2.7 | 0.044 | 0.051 |
| Trihexagonal tiling | trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 2.7 | 0.044 | 0.070 |
| Trihexagonal tiling | trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 2.7 | 0.042 | 0.043 |
| Trihexagonal tiling | trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.6 | 0.021 | 0.027 |
| Trihexagonal tiling | trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 2.9 | 0.045 | 0.049 |
| Trihexagonal tiling | trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 2.9 | 0.044 | 0.045 |
| Trihexagonal tiling | trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 2.9 | 0.045 | 0.053 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.5 | 0.021 | 0.022 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 2.7 | 0.042 | 0.044 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 2.7 | 0.040 | 0.041 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 2.7 | 0.041 | 0.049 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.5 | 0.021 | 0.023 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.7 | 0.042 | 0.045 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.7 | 0.042 | 0.048 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.7 | 0.041 | 0.043 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.6 | 0.021 | 0.024 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 2.9 | 0.044 | 0.048 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 2.9 | 0.044 | 0.045 |
| Trihexagonal tiling | trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 2.9 | 0.044 | 0.044 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.5 | 0.021 | 0.022 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 2.7 | 0.041 | 0.049 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 2.7 | 0.040 | 0.042 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 2.7 | 0.041 | 0.042 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.5 | 0.021 | 0.023 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 2.7 | 0.042 | 0.045 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 2.7 | 0.042 | 0.044 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 2.7 | 0.042 | 0.043 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.6 | 0.020 | 0.029 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.9 | 0.044 | 0.049 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.9 | 0.043 | 0.044 |
| Trihexagonal tiling | trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.9 | 0.043 | 0.050 |
| Truncated square tiling | truncated-square | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.0 | 0.010 | 0.011 |
| Truncated square tiling | truncated-square | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 1.7 | 0.018 | 0.021 |
| Truncated square tiling | truncated-square | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 1.7 | 0.018 | 0.019 |
| Truncated square tiling | truncated-square | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 1.7 | 0.019 | 0.020 |
| Truncated square tiling | truncated-square | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.0 | 0.010 | 0.012 |
| Truncated square tiling | truncated-square | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 1.8 | 0.018 | 0.020 |
| Truncated square tiling | truncated-square | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 1.8 | 0.018 | 0.019 |
| Truncated square tiling | truncated-square | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 1.8 | 0.018 | 0.020 |
| Truncated square tiling | truncated-square | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.0 | 0.010 | 0.011 |
| Truncated square tiling | truncated-square | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 1.9 | 0.019 | 0.021 |
| Truncated square tiling | truncated-square | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 1.9 | 0.020 | 0.021 |
| Truncated square tiling | truncated-square | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 1.9 | 0.019 | 0.020 |
| Truncated square tiling | truncated-square | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.0 | 0.010 | 0.017 |
| Truncated square tiling | truncated-square | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 1.7 | 0.018 | 0.020 |
| Truncated square tiling | truncated-square | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 1.7 | 0.019 | 0.025 |
| Truncated square tiling | truncated-square | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 1.7 | 0.019 | 0.020 |
| Truncated square tiling | truncated-square | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.0 | 0.011 | 0.011 |
| Truncated square tiling | truncated-square | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.8 | 0.018 | 0.019 |
| Truncated square tiling | truncated-square | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.8 | 0.018 | 0.020 |
| Truncated square tiling | truncated-square | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.8 | 0.019 | 0.028 |
| Truncated square tiling | truncated-square | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.1 | 0.010 | 0.011 |
| Truncated square tiling | truncated-square | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 1.9 | 0.020 | 0.020 |
| Truncated square tiling | truncated-square | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 1.9 | 0.019 | 0.020 |
| Truncated square tiling | truncated-square | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 1.9 | 0.019 | 0.019 |
| Truncated square tiling | truncated-square | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.0 | 0.010 | 0.012 |
| Truncated square tiling | truncated-square | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 1.7 | 0.019 | 0.022 |
| Truncated square tiling | truncated-square | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 1.7 | 0.018 | 0.020 |
| Truncated square tiling | truncated-square | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 1.7 | 0.019 | 0.019 |
| Truncated square tiling | truncated-square | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.0 | 0.010 | 0.011 |
| Truncated square tiling | truncated-square | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 1.8 | 0.019 | 0.020 |
| Truncated square tiling | truncated-square | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 1.8 | 0.018 | 0.019 |
| Truncated square tiling | truncated-square | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 1.8 | 0.018 | 0.019 |
| Truncated square tiling | truncated-square | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.1 | 0.010 | 0.011 |
| Truncated square tiling | truncated-square | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.9 | 0.019 | 0.024 |
| Truncated square tiling | truncated-square | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.9 | 0.019 | 0.020 |
| Truncated square tiling | truncated-square | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.9 | 0.020 | 0.032 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.9 | 0.026 | 0.027 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 3.8 | 0.058 | 0.089 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 3.8 | 0.053 | 0.056 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 3.8 | 0.052 | 0.057 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 2.0 | 0.022 | 0.025 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 4.1 | 0.052 | 0.057 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 4.1 | 0.052 | 0.060 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 4.1 | 0.053 | 0.057 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 2.1 | 0.022 | 0.026 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 4.3 | 0.063 | 0.093 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 4.3 | 0.055 | 0.056 |
| Truncated hexagonal tiling | truncated-hexagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 4.3 | 0.056 | 0.058 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.9 | 0.023 | 0.026 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 3.9 | 0.052 | 0.058 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 3.9 | 0.054 | 0.073 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 3.9 | 0.051 | 0.054 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 2.0 | 0.023 | 0.026 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 4.1 | 0.062 | 0.921 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 4.1 | 0.054 | 0.058 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 4.1 | 0.052 | 0.054 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 2.1 | 0.021 | 0.046 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 4.3 | 0.057 | 0.064 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 4.3 | 0.055 | 0.057 |
| Truncated hexagonal tiling | truncated-hexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 4.3 | 0.056 | 0.085 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.9 | 0.025 | 0.027 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 3.9 | 0.051 | 0.058 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 3.9 | 0.050 | 0.054 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 3.9 | 0.050 | 0.054 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 2.0 | 0.022 | 0.025 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 4.1 | 0.051 | 0.055 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 4.1 | 0.052 | 0.054 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 4.1 | 0.051 | 0.059 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 2.1 | 0.022 | 0.023 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 4.3 | 0.056 | 0.059 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 4.3 | 0.055 | 0.063 |
| Truncated hexagonal tiling | truncated-hexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 4.3 | 0.056 | 0.057 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.9 | 0.024 | 0.031 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 3.5 | 0.052 | 0.059 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 3.5 | 0.051 | 0.057 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 3.5 | 0.051 | 0.057 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 2.0 | 0.027 | 0.031 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 3.8 | 0.057 | 0.062 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 3.8 | 0.056 | 0.064 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 3.8 | 0.056 | 0.056 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 2.1 | 0.022 | 0.024 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 3.9 | 0.057 | 0.073 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 3.9 | 0.055 | 0.056 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 3.9 | 0.056 | 0.063 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.9 | 0.023 | 0.025 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 3.5 | 0.051 | 0.053 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 3.5 | 0.051 | 0.080 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 3.5 | 0.050 | 0.051 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 2.0 | 0.026 | 0.028 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 3.8 | 0.057 | 0.080 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 3.8 | 0.056 | 0.058 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 3.8 | 0.056 | 0.064 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 2.1 | 0.021 | 0.023 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 3.9 | 0.056 | 0.060 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 3.9 | 0.057 | 0.062 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 3.9 | 0.056 | 0.059 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.9 | 0.022 | 0.024 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 3.5 | 0.052 | 0.064 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 3.5 | 0.051 | 0.052 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 3.5 | 0.050 | 0.052 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 2.0 | 0.025 | 0.029 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 3.8 | 0.058 | 0.063 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 3.8 | 0.057 | 0.062 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 3.8 | 0.056 | 0.058 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 2.1 | 0.021 | 0.025 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 3.9 | 0.056 | 0.061 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 3.9 | 0.055 | 0.057 |
| Rhombitrihexagonal tiling | rhombitrihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 3.9 | 0.055 | 0.056 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.4 | 0.020 | 0.022 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 2.5 | 0.040 | 0.044 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 2.5 | 0.038 | 0.040 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 2.5 | 0.039 | 0.047 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.5 | 0.017 | 0.019 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 2.6 | 0.037 | 0.040 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 2.6 | 0.037 | 0.037 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 2.6 | 0.037 | 0.048 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.5 | 0.020 | 0.021 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 2.7 | 0.042 | 0.045 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 2.7 | 0.041 | 0.042 |
| Elongated triangular tiling | elongated-triangular | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 2.7 | 0.041 | 0.043 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.4 | 0.020 | 0.021 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 2.5 | 0.040 | 0.042 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 2.5 | 0.040 | 0.046 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 2.5 | 0.038 | 0.040 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.5 | 0.017 | 0.019 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.6 | 0.037 | 0.040 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.6 | 0.037 | 0.048 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.6 | 0.036 | 0.037 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.5 | 0.019 | 0.021 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 2.7 | 0.042 | 0.043 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 2.7 | 0.041 | 0.043 |
| Elongated triangular tiling | elongated-triangular | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 2.7 | 0.041 | 0.042 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.4 | 0.019 | 0.022 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 2.5 | 0.040 | 0.047 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 2.5 | 0.038 | 0.047 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 2.5 | 0.039 | 0.041 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.5 | 0.017 | 0.019 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 2.6 | 0.038 | 0.045 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 2.6 | 0.037 | 0.038 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 2.6 | 0.037 | 0.038 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.5 | 0.020 | 0.022 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.7 | 0.041 | 0.052 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.7 | 0.041 | 0.045 |
| Elongated triangular tiling | elongated-triangular | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.7 | 0.041 | 0.042 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 2.4 | 0.030 | 0.036 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 4.8 | 0.069 | 0.080 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 4.8 | 0.069 | 0.078 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 4.8 | 0.067 | 0.070 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 2.6 | 0.027 | 0.030 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 5.3 | 0.068 | 0.074 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 5.3 | 0.071 | 0.075 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 5.3 | 0.067 | 0.070 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 2.7 | 0.028 | 0.031 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 5.5 | 0.080 | 0.083 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 5.5 | 0.074 | 0.077 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 5.5 | 0.074 | 0.075 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 2.5 | 0.030 | 0.039 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 4.9 | 0.071 | 0.076 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 4.9 | 0.071 | 0.084 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 4.9 | 0.069 | 0.081 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 2.6 | 0.027 | 0.031 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 5.3 | 0.071 | 0.078 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 5.3 | 0.069 | 0.071 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 5.3 | 0.068 | 0.074 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 2.7 | 0.028 | 0.032 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 5.5 | 0.076 | 0.084 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 5.5 | 0.074 | 0.078 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 5.5 | 0.078 | 0.085 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 2.5 | 0.030 | 0.034 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 4.9 | 0.071 | 0.076 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 4.9 | 0.068 | 0.069 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 4.9 | 0.077 | 0.108 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 2.6 | 0.028 | 0.031 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 5.3 | 0.071 | 0.086 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 5.3 | 0.069 | 0.106 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 5.3 | 0.074 | 0.538 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 2.7 | 0.028 | 0.032 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 5.5 | 0.079 | 0.116 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 5.5 | 0.075 | 0.079 |
| Truncated trihexagonal tiling | truncated-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 5.5 | 0.075 | 0.077 |
| Snub square tiling | snub-square | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.7 | 0.026 | 0.027 |
| Snub square tiling | snub-square | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 3.1 | 0.053 | 0.079 |
| Snub square tiling | snub-square | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 3.1 | 0.051 | 0.054 |
| Snub square tiling | snub-square | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 3.1 | 0.050 | 0.090 |
| Snub square tiling | snub-square | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.8 | 0.024 | 0.030 |
| Snub square tiling | snub-square | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 3.4 | 0.053 | 0.058 |
| Snub square tiling | snub-square | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 3.4 | 0.052 | 0.063 |
| Snub square tiling | snub-square | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 3.4 | 0.051 | 0.055 |
| Snub square tiling | snub-square | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.9 | 0.025 | 0.070 |
| Snub square tiling | snub-square | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 3.5 | 0.057 | 0.070 |
| Snub square tiling | snub-square | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 3.5 | 0.058 | 0.060 |
| Snub square tiling | snub-square | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 3.5 | 0.058 | 0.063 |
| Snub square tiling | snub-square | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.7 | 0.024 | 0.026 |
| Snub square tiling | snub-square | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 3.1 | 0.050 | 0.056 |
| Snub square tiling | snub-square | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 3.1 | 0.051 | 0.057 |
| Snub square tiling | snub-square | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 3.1 | 0.050 | 0.056 |
| Snub square tiling | snub-square | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.8 | 0.024 | 0.027 |
| Snub square tiling | snub-square | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 3.4 | 0.053 | 0.059 |
| Snub square tiling | snub-square | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 3.4 | 0.051 | 0.052 |
| Snub square tiling | snub-square | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 3.4 | 0.051 | 0.054 |
| Snub square tiling | snub-square | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.9 | 0.025 | 0.031 |
| Snub square tiling | snub-square | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 3.5 | 0.057 | 0.062 |
| Snub square tiling | snub-square | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 3.5 | 0.057 | 0.064 |
| Snub square tiling | snub-square | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 3.5 | 0.056 | 0.060 |
| Snub square tiling | snub-square | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.7 | 0.026 | 0.029 |
| Snub square tiling | snub-square | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 3.1 | 0.051 | 0.056 |
| Snub square tiling | snub-square | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 3.1 | 0.050 | 0.054 |
| Snub square tiling | snub-square | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 3.1 | 0.050 | 0.050 |
| Snub square tiling | snub-square | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.8 | 0.024 | 0.029 |
| Snub square tiling | snub-square | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 3.4 | 0.052 | 0.057 |
| Snub square tiling | snub-square | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 3.4 | 0.052 | 0.055 |
| Snub square tiling | snub-square | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 3.4 | 0.051 | 0.058 |
| Snub square tiling | snub-square | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.9 | 0.025 | 0.027 |
| Snub square tiling | snub-square | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 3.5 | 0.058 | 0.061 |
| Snub square tiling | snub-square | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 3.5 | 0.057 | 0.065 |
| Snub square tiling | snub-square | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 3.5 | 0.056 | 0.058 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 7.7 | 0.112 | 0.124 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 15.5 | 0.279 | 0.299 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 15.5 | 0.275 | 0.289 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 15.5 | 0.278 | 0.285 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 8.3 | 0.109 | 0.119 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 16.7 | 0.308 | 0.341 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 16.7 | 0.303 | 0.316 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 16.7 | 0.300 | 0.309 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 8.6 | 0.108 | 0.119 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 17.3 | 0.325 | 0.328 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 17.3 | 0.324 | 0.336 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 17.3 | 0.322 | 0.345 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 7.7 | 0.116 | 0.118 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 15.5 | 0.286 | 0.309 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 15.5 | 0.275 | 0.283 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 15.5 | 0.280 | 0.763 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 8.3 | 0.119 | 0.158 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 16.7 | 0.314 | 0.346 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 16.7 | 0.312 | 0.350 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 16.7 | 0.301 | 0.307 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 8.6 | 0.111 | 0.117 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 17.3 | 0.324 | 0.333 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 17.3 | 0.321 | 0.338 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 17.3 | 0.320 | 0.337 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 7.7 | 0.109 | 0.114 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 15.5 | 0.280 | 0.285 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 15.5 | 0.275 | 0.279 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 15.5 | 0.274 | 0.279 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 8.3 | 0.108 | 0.124 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 16.7 | 0.303 | 0.324 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 16.7 | 0.300 | 0.308 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 16.7 | 0.302 | 0.305 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 8.6 | 0.112 | 0.116 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 17.3 | 0.322 | 0.350 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 17.3 | 0.320 | 0.330 |
| Snub hexagonal tiling — left-handed | snub-hexagonal-left | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 17.3 | 0.317 | 0.329 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 7.7 | 0.110 | 0.117 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 15.5 | 0.274 | 0.288 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 15.5 | 0.271 | 0.277 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 15.5 | 0.284 | 0.730 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 8.3 | 0.109 | 0.113 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 16.7 | 0.309 | 0.313 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 16.7 | 0.303 | 0.311 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 16.7 | 0.307 | 0.333 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 8.6 | 0.111 | 0.118 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 17.3 | 0.321 | 0.335 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 17.3 | 0.323 | 0.334 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 17.3 | 0.324 | 0.389 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 7.7 | 0.113 | 0.135 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 15.5 | 0.278 | 0.305 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 15.5 | 0.285 | 0.290 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 15.5 | 0.275 | 0.288 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 8.3 | 0.109 | 0.121 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 16.7 | 0.305 | 0.321 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 16.7 | 0.302 | 0.309 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 16.7 | 0.301 | 0.312 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 8.6 | 0.111 | 0.122 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 17.3 | 0.322 | 0.331 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 17.3 | 0.323 | 0.332 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 17.3 | 0.320 | 0.333 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 7.7 | 0.108 | 0.113 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 15.5 | 0.278 | 0.293 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 15.5 | 0.275 | 0.280 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 15.5 | 0.288 | 0.694 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 8.3 | 0.108 | 0.115 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 16.7 | 0.311 | 0.315 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 16.7 | 0.314 | 0.361 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 16.7 | 0.312 | 0.330 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 8.6 | 0.115 | 0.126 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 17.3 | 0.429 | 0.494 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 17.3 | 0.424 | 0.432 |
| Snub hexagonal tiling — right-handed | snub-hexagonal-right | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 17.3 | 0.327 | 0.361 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.3 | 0.016 | 0.024 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 2.1 | 0.030 | 0.034 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 2.1 | 0.030 | 0.040 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 2.1 | 0.030 | 0.031 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.3 | 0.015 | 0.018 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 2.2 | 0.029 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 2.2 | 0.029 | 0.033 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 2.2 | 0.029 | 0.031 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.3 | 0.015 | 0.017 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 2.3 | 0.030 | 0.031 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 2.3 | 0.030 | 0.031 |
| Rhombille (tumbling blocks) | rhombille | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 2.3 | 0.030 | 0.037 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.3 | 0.016 | 0.017 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 2.1 | 0.030 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 2.1 | 0.029 | 0.029 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 2.1 | 0.029 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.3 | 0.016 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.2 | 0.029 | 0.031 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.2 | 0.028 | 0.029 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.2 | 0.029 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.4 | 0.015 | 0.016 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 2.3 | 0.030 | 0.038 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 2.3 | 0.029 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 2.3 | 0.030 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.3 | 0.016 | 0.017 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 2.1 | 0.030 | 0.038 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 2.1 | 0.029 | 0.030 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 2.1 | 0.030 | 0.032 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.3 | 0.015 | 0.017 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 2.2 | 0.031 | 0.051 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 2.2 | 0.030 | 0.040 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 2.2 | 0.028 | 0.031 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.4 | 0.015 | 0.017 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 2.3 | 0.030 | 0.032 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 2.3 | 0.030 | 0.039 |
| Rhombille (tumbling blocks) | rhombille | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 2.3 | 0.029 | 0.030 |
| Tetrakis square | tetrakis-square | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.0 | 0.014 | 0.017 |
| Tetrakis square | tetrakis-square | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 1.6 | 0.024 | 0.026 |
| Tetrakis square | tetrakis-square | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 1.6 | 0.025 | 0.026 |
| Tetrakis square | tetrakis-square | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 1.6 | 0.024 | 0.031 |
| Tetrakis square | tetrakis-square | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.0 | 0.014 | 0.015 |
| Tetrakis square | tetrakis-square | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 1.7 | 0.026 | 0.029 |
| Tetrakis square | tetrakis-square | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 1.7 | 0.026 | 0.028 |
| Tetrakis square | tetrakis-square | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 1.7 | 0.026 | 0.027 |
| Tetrakis square | tetrakis-square | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.1 | 0.014 | 0.015 |
| Tetrakis square | tetrakis-square | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 1.8 | 0.028 | 0.039 |
| Tetrakis square | tetrakis-square | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 1.8 | 0.029 | 0.032 |
| Tetrakis square | tetrakis-square | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 1.8 | 0.028 | 0.030 |
| Tetrakis square | tetrakis-square | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.0 | 0.014 | 0.015 |
| Tetrakis square | tetrakis-square | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 1.6 | 0.024 | 0.025 |
| Tetrakis square | tetrakis-square | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 1.6 | 0.024 | 0.033 |
| Tetrakis square | tetrakis-square | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 1.6 | 0.023 | 0.024 |
| Tetrakis square | tetrakis-square | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.0 | 0.014 | 0.015 |
| Tetrakis square | tetrakis-square | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.7 | 0.026 | 0.027 |
| Tetrakis square | tetrakis-square | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.7 | 0.026 | 0.028 |
| Tetrakis square | tetrakis-square | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.7 | 0.026 | 0.033 |
| Tetrakis square | tetrakis-square | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.1 | 0.014 | 0.016 |
| Tetrakis square | tetrakis-square | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 1.8 | 0.029 | 0.032 |
| Tetrakis square | tetrakis-square | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 1.8 | 0.029 | 0.029 |
| Tetrakis square | tetrakis-square | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 1.8 | 0.028 | 0.029 |
| Tetrakis square | tetrakis-square | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.0 | 0.014 | 0.016 |
| Tetrakis square | tetrakis-square | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 1.6 | 0.023 | 0.025 |
| Tetrakis square | tetrakis-square | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 1.6 | 0.024 | 0.024 |
| Tetrakis square | tetrakis-square | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 1.6 | 0.024 | 0.024 |
| Tetrakis square | tetrakis-square | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.0 | 0.014 | 0.015 |
| Tetrakis square | tetrakis-square | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 1.7 | 0.026 | 0.039 |
| Tetrakis square | tetrakis-square | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 1.7 | 0.025 | 0.026 |
| Tetrakis square | tetrakis-square | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 1.7 | 0.025 | 0.027 |
| Tetrakis square | tetrakis-square | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.1 | 0.014 | 0.015 |
| Tetrakis square | tetrakis-square | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 1.8 | 0.028 | 0.031 |
| Tetrakis square | tetrakis-square | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 1.8 | 0.029 | 0.037 |
| Tetrakis square | tetrakis-square | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 1.8 | 0.028 | 0.028 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 5400 | 1.7 | 0.018 | 0.020 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 5400 | 3.0 | 0.040 | 0.044 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 5400 | 3.0 | 0.039 | 0.059 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 5400 | 3.0 | 0.039 | 0.043 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 468 | 1.8 | 0.021 | 0.023 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 468 | 3.2 | 0.045 | 0.047 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 468 | 3.2 | 0.043 | 0.044 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 468 | 3.2 | 0.043 | 0.045 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 117 | 1.9 | 0.019 | 0.021 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 117 | 3.4 | 0.048 | 0.056 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 117 | 3.4 | 0.047 | 0.051 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 900x600 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 117 | 3.4 | 0.046 | 0.047 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 20736 | 1.7 | 0.019 | 0.028 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 20736 | 3.0 | 0.040 | 0.043 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 20736 | 3.0 | 0.039 | 0.040 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 20736 | 3.0 | 0.040 | 0.048 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.8 | 0.020 | 0.023 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 3.2 | 0.044 | 0.047 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 3.2 | 0.043 | 0.044 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 3.2 | 0.043 | 0.051 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 449 | 1.9 | 0.019 | 0.022 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 449 | 3.4 | 0.048 | 0.051 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 449 | 3.4 | 0.048 | 0.058 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 1920x1080 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 449 | 3.4 | 0.046 | 0.047 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 82944 | 1.7 | 0.018 | 0.019 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 82944 | 3.0 | 0.040 | 0.043 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 82944 | 3.0 | 0.040 | 0.043 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 10 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 82944 | 3.0 | 0.039 | 0.041 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 7176 | 1.8 | 0.020 | 0.098 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 7176 | 3.2 | 0.044 | 0.057 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 7176 | 3.2 | 0.044 | 0.047 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 34 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 7176 | 3.2 | 0.043 | 0.045 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 0 | 20260824 | Repeating cell | 1794 | 1.9 | 0.020 | 0.027 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 1 | 20260824 | Repeating cell | 1794 | 3.4 | 0.047 | 0.049 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 3 | 20260824 | Repeating cell | 1794 | 3.4 | 0.047 | 0.048 |
| Deltoidal trihexagonal | deltoidal-trihexagonal | 3840x2160 | 68 | 0 | 0 | 16 | 6 | 20260824 | Repeating cell | 1794 | 3.4 | 0.046 | 0.056 |
