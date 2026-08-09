# Implement the Frank–Robinson tiling

Add the non-Pisot infinite-local-complexity stone inflation with scale \((1+\sqrt{13})/2\).

## Acceptance criteria

- Implement the four published rectangular/square-type prototiles and exact inflation offsets.
- Preserve irrational relative offsets; do not quantize the construction into an FLC grid.
- Generate a gap-free requested patch while handling boundary selection robustly.
- Test inflation/area, four classes, evidence of growing local offset diversity, coverage, rendering, and registry integration.
- Document the ILC and singular-continuous diffraction caveats; typecheck, tests, and build pass.
