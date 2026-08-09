# Implement the Frank–Robinson tiling

Add the non-Pisot infinite-local-complexity stone inflation with scale \((1+\sqrt{13})/2\).

## Acceptance criteria

- Implement the four published rectangular/square-type prototiles and exact inflation offsets.
- Preserve irrational relative offsets; do not quantize the construction into an FLC grid.
- Generate a gap-free requested patch while handling boundary selection robustly.
- Test inflation/area, four classes, evidence of growing local offset diversity, coverage, rendering, and registry integration.
- Cite the exact example/figure used for prototile dimensions and offsets; attribute reused assets and verify license compatibility.
- Document the ILC and singular-continuous diffraction caveats; typecheck, tests, and build pass.

## References

- [Frank and Robinson, “Generalized β-expansions, substitution tilings, and local finiteness”](https://arxiv.org/abs/math/0506098) — primary construction and non-Pisot local-finiteness analysis.
- [Tilings Encyclopedia: Priebe Frank non-PV](https://tilings.math.uni-bielefeld.de/substitution/priebe-frank-non-pv/) — substitution diagram and prototile summary.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — diffraction references and project context.
