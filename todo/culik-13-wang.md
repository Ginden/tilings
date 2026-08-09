# Implement Culik’s 13 Wang tiles

Add the Kari–Culik 13-tile Wang shift with its five edge colors.

## Acceptance criteria

- Encode the exact thirteen Wang tiles and their horizontal/vertical color matching rules.
- Use a deterministic legal patch-generation method; do not present a periodic hand-picked patch as the system.
- Generate a requested central patch with no illegal adjacencies.
- Test the full tile set, every shared edge, nonperiodicity indicators, rendering, and registry integration.
- Cite the source table/figure for the thirteen edge-color tuples and document the legal-patch algorithm; attribute reused assets and verify license compatibility.
- Document that the system has positive entropy and no conventional substitution hierarchy; typecheck, tests, and build pass.

## References

- [Culik, “An aperiodic set of 13 Wang tiles” (1996)](https://doi.org/10.1016/S0012-365X(96)00118-5) — primary tile set and arithmetic construction.
- [Durand, Gamard, and Grandjean, “Aperiodic tilings and entropy” (2017)](https://doi.org/10.1016/j.tcs.2016.12.013) — later analysis of Kari–Culik tilings and entropy.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project context and further bibliography.
