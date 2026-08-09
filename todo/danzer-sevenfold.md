# Implement the Danzer sevenfold tiling

Add the flagship Nischke–Danzer sevenfold triangular inflation system.

## Acceptance criteria

- Implement the three triangle shapes and edge lengths based on \(\sin(k\pi/7)\) from the published rule.
- Carry the orientation/vertex-star states needed for the finite local constraints.
- Generate a gap-free patch covering the requested disc.
- Test triangle ratios, non-Pisot inflation, substitution area, classes, coverage, rendering, and registry integration.
- Cite the exact published or archival rule used for every triangle and orientation state; attribute reused diagrams/assets and verify license compatibility.
- Document that this is the sevenfold member of a broader family; typecheck, tests, and build pass.

## References

- [Nischke and Danzer, “A Construction of Inflation Rules Based on n-Fold Symmetry” (1996)](https://dblp.org/rec/journals/dcg/NischkeD96) — primary family paper and publication metadata.
- [Tilings Encyclopedia: Danzer’s 7-fold](https://tilings.math.uni-bielefeld.de/substitution/danzers-7-fold/) — explicit three-triangle rule and metric data.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project context and further bibliography.
