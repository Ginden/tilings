# Penrose tilings

An interactive visualiser for periodic and aperiodic tessellations. Pick a tiling
from the list, choose two colours and a border colour, set the canvas size and
tile size, and the tiling fills the background as an SVG you can download as SVG
or PNG.

Everything is generated in the browser: the tilings are computed in TypeScript
(compiled by Vite) and emitted as SVG paths — there is no server, no canvas
rasterisation for display, and no runtime dependencies.

![Penrose P3 rhombs](docs/preview.png)

## Tilings

| Tiling | Prototiles | How it is generated |
| --- | --- | --- |
| Triangular | equilateral triangle | one rectangular translation cell, repeated as a CSS background |
| Square | square | one chequerboard translation cell, repeated as a CSS background |
| Hexagonal | regular hexagon | one honeycomb translation cell, repeated as a CSS background |
| Trihexagonal (kagome) | triangle + hexagon | unit-edge lattice with vertex figure 3.6.3.6 |
| Truncated square | square + octagon | square-lattice cell with vertex figure 4.8.8 |
| Truncated hexagonal | triangle + dodecagon | unit-edge lattice with vertex figure 3.12.12 |
| Rhombitrihexagonal | triangle + square + hexagon | unit-edge lattice with vertex figure 3.4.6.4 |
| Elongated triangular | triangle + square | unit-edge lattice with vertex figure 3³.4² |
| Truncated trihexagonal | square + hexagon + dodecagon | unit-edge lattice with vertex figure 4.6.12 |
| Snub square | triangle + square | unit-edge lattice with vertex figure 3².4.3.4 |
| Snub hexagonal (left/right) | triangle + hexagon | both mirror forms of the chiral unit-edge lattice with vertex figure 3⁴.6 |
| Penrose P3 — rhombs | thick + thin rhomb | Robinson triangle deflation, half-tiles glued on their bases |
| Penrose P2 — kite and dart | kite + dart | Robinson triangle deflation with the mirror axis tracked per half-tile |
| Penrose P1 — pentagons | 3 matched pentagons + star + boat + diamond | six-prototile pentagonal L-system decomposition |
| Penrose rhombs — pentagrid | thick + thin rhomb | de Bruijn's pentagrid (dual of five line families, offsets summing to zero) |
| Robinson triangles | golden triangle + gnomon | the P3 deflation, drawn as half-tiles |
| Ammann–Beenker (8-fold) | square + 45° rhomb | four-family multigrid |
| Dodecagonal (12-fold) | 30°/60°/90° rhombs | six-family multigrid |
| Heptagonal (14-fold) | three rhombs | seven-family multigrid |
| Decagonal (20-fold) | five rhombs | ten-family multigrid |
| Socolar (12-fold) | 30° rhomb + square + hexagon | six-family dual grid, with 60° rhomb triples recomposed as hexagons |
| Tübingen triangle | four handed Robinson triangles | golden-ratio substitution retaining left/right hierarchy state |
| Hat monotile (einstein) | one 13-sided tile | H/T/P/F metatile substitution (see credits) |
| Pinwheel (Conway–Radin) | 1–2–√5 right triangle | rep-5 substitution; tiles appear in infinitely many orientations |
| Chair (L-tromino) | L-tromino | rep-4 substitution, grown outwards from a central supertile |
| Sphinx hexiamond | pentagonal hexiamond + mirror image | exact rep-4 affine dissection |
| Voderberg spiral | congruent interlocking nonagons | plane-covering double spiral grown recursively in successive beak-to-butt layers |
| Shuriken tiling (12-fold) | fourteen substitution states based on a dodecagon and seven triangular shapes/scales | Paz's primitive dense-orientation substitution with inflation √(5 + 2√3), reconstructed as verified affine placement data |
| Squiral | one rep-9 spiral tile, in two chiralities | Baake and Grimm's scale-3 bijective 3×3 block substitution, run on the rosettes of four like-handed tiles and drawn with the spiral carrier |
| Jeandel–Rao 11 Wang tiles | eleven unit squares with four edge colours | coding the orbit of a point under the two unit translations of the torus ℝ²/⟨(φ,0),(1,φ+3)⟩ through Labbé's eleven-letter Markov partition; each square drawn as four triangles carrying its edge colours |
| Seeded Voronoi mosaic | convex polygons | a seeded hard-core random site process partitioned by perpendicular bisectors |

Tilings with more than two tile classes shade their classes evenly between the
chosen colours. Socolar, Heptagonal, Decagonal, the Hat monotile, Shuriken,
Rhombitrihexagonal, and Truncated trihexagonal can add a third stop, giving
three-class tilings exact colours and larger class sets a two-part gradient
through the middle colour.

The Voronoi mosaic assigns one of four seeded shades to each site. The assignment
stays fixed while zooming or resizing; neighbouring cells may share a shade.

## Controls

* **Type** — the tiling, grouped by family and sorted by name within each group.
* **Random seed** — shown for algorithmic tilings; defaults to the local date as
  `YYYYMMDD` and makes the generated mosaic reproducible.
* **Colour 1 / Colour 2** — the two base tile colours, as pickers or hex values,
  plus ten named preset palettes grouped into classic and studio collections.
* **Third colour** — available on selected multi-class tilings, with six
  three-colour palettes that appear only when they can be used and a control to
  swap the second and third colours.
* **Border** — colour, width, and a *transparent* switch that drops the stroke
  entirely (the background is then filled with a blend of the two colours so no
  seams show).
* **Screen size** — fit the window, one of the common presets (Full HD, 4K,
  phone, A4, square) or a custom pixel size.
* **Tile size** — the nominal tile size in pixels. Tile areas are normalised per
  tiling, so 40 px means roughly the same visual density everywhere. A patch is
  capped at 30 000 tiles; past that the tile size is raised automatically and the
  status line says so, which keeps a 4K canvas from locking up the tab.

The full configuration lives in the URL hash, so any view can be shared or
bookmarked.

Periodic tilings use a small repeating SVG cell in the browser and an SVG
`<pattern>` in downloads. Their output size is therefore independent of the
canvas dimensions and they do not need the 30 000-tile patch limit.

## Exports

* **Download SVG** — the standalone SVG at the chosen pixel size.
* **Download PNG** — the same image rasterised at the chosen pixel size.
* **Copy image** — rasterise the image as PNG and copy it to the clipboard.

Downloaded SVGs contain RDF/Dublin Core metadata. PNG downloads and copied PNGs
carry the same metadata as XMP in a standard `iTXt` chunk, including the tiling
name and description, source reference, creation time, format, and file name.

Files are named after their settings, for example
`penrose-p3_1920x1080_tile42_e8b53b-1b3a5c_border-101820.svg`.

## Development

```bash
npm ci
npm run dev        # Vite dev server
npm run typecheck  # tsc --noEmit
npm test           # vitest
npm run build      # typecheck + production build into dist/
```

Static PNG assets are generated from their SVG sources. After changing the
favicon or preview, regenerate them with:

```bash
./scripts/generate-assets.sh
```

The test suite samples random points inside every generated patch and asserts
that each is covered by exactly one tile, which catches both gaps and overlaps —
the failure mode that a wrong substitution rule produces. To eyeball the output:

```bash
PREVIEW_DIR=/tmp/tilings npm test   # writes one SVG per tiling
```

## Deployment

`Dockerfile` is a multi-stage build: Node 24 typechecks, tests and builds the
site, then a `scratch` stage places the contents of `dist` at the image root.
The resulting data-only OCI image is mounted read-only as a Kubernetes image
volume and served by the shared frontend nginx. It is not a runnable container.
Images carry OpenContainers annotations and are published to
`oci.wadas.dev/nuc/penrose-tilings`.

```bash
docker build -t penrose-tilings .
```

Gitea Actions:

* `.gitea/workflows/ci.yaml` — typecheck, test and build on every push and pull
  request, uploading `dist` as an artifact.
* `.gitea/workflows/image.yaml` — build and push the container image on `main`,
  tagged `YYYY.DDD.HHMM`, the branch name and `latest`.

## Credits

The hat metatile construction is ported from Craig S. Kaplan's
[hatviz](https://github.com/isohedral/hatviz) (BSD 3-Clause) — see
[THIRD-PARTY-LICENSES.md](THIRD-PARTY-LICENSES.md). The P1 L-system follows the
rules documented by Andrew Stacey's [Penrose package](https://ctan.org/pkg/penrose).
The Sphinx rep-4 child maps follow the classical four-copy hexiamond
dissection. Everything else is derived from the geometry described on Wikipedia's
[Penrose tiling](https://en.wikipedia.org/wiki/Penrose_tiling) and
[list of aperiodic sets of tiles](https://en.wikipedia.org/wiki/List_of_aperiodic_sets_of_tiles)
pages. The Archimedean translation cells use the integer-lattice construction
from Soto Sánchez, Medeiros e Sá and de Figueiredo's
[“Synthesizing Periodic Tilings of Regular Polygons”](https://doi.org/10.1109/SIBGRAPI.2018.00009).
