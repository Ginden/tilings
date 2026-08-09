# Implement Culik’s 13 Wang tiles

Add the Kari–Culik 13-tile Wang shift with its five edge colors.

## Acceptance criteria

- Encode the exact thirteen Wang tiles and their horizontal/vertical color matching rules.
- Use a deterministic legal patch-generation method; do not present a periodic hand-picked patch as the system.
- Generate a requested central patch with no illegal adjacencies.
- Test the full tile set, every shared edge, nonperiodicity indicators, rendering, and registry integration.
- Document that the system has positive entropy and no conventional substitution hierarchy; typecheck, tests, and build pass.
