# Implement the Watanabe–Soma–Ito twelvefold tiling

Add the thin-rhomb, equilateral-triangle, and square dodecagonal substitution.

## Acceptance criteria

- Implement the 1995 zonogon-derived substitution with inflation factor \(2+\sqrt3\).
- Preserve all orientation states required by the canonical substitution.
- Generate a gap-free requested patch containing all three base shapes.
- Test the inflation matrix/area, prototile geometry, coverage, rendering, and registry integration.
- Use the corrected canonical substitution that reproduces the published level-3 square supertile, and cite the exact source/correction in code comments; attribute reused assets and verify license compatibility.
- Document the source and distinction from Socolar/Stampfli; typecheck, tests, and build pass.

## References

- Watanabe, Soma, and Ito, “A new quasiperiodic tiling with dodecagonal symmetry” (1995), *Acta Crystallographica A* 51, 936–942 — primary construction; see the full citation in the local catalog.
- [Tilings Encyclopedia: Watanabe–Ito–Soma 12-fold](https://tilings.math.uni-bielefeld.de/substitution/watanabe-ito-soma-12-fold/) — corrected explicit substitution and ambiguity note.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project context and comparative bibliography.
