# Implement the deterministic Stampfli tiling

Add Stampfli’s dodecagonal square–triangle inflation with deterministic orientation/state information.

## Acceptance criteria

- Implement the published deterministic substitution with inflation factor \(2+\sqrt3\).
- Distinguish the decorated states needed to select the canonical hull from random square–triangle tilings.
- Generate a gap-free central patch containing squares and equilateral triangles.
- Test inflation geometry, state coverage, area conservation, disc coverage, rendering, and registry integration.
- Cite the exact deterministic rule and state decorations used to resolve local choices; attribute reused assets and verify license compatibility.
- Document the deterministic/random distinction; typecheck, tests, and build pass.

## References

- [Stampfli, “A dodecagonal quasiperiodic lattice in two dimensions” (1986)](https://cir.nii.ac.jp/crid/1370285710933223809) — original publication metadata.
- [Tilings Encyclopedia: substitution catalogue](https://tilings.math.uni-bielefeld.de/substitution/) — Stampfli variants and comparison diagrams.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project scope and deterministic/random caveat.
