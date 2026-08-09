# Implement the twelvefold Shuriken tiling

Add the dense-orientation dodecagonal Shuriken substitution.

> **Status.** Implemented. The supplied reconstruction recovers Paz's complete
> primitive 14-state rule; see [shuriken_solution.md](../shuriken_solution.md)
> for the exact prototiles, substitution counts, primitivity proof, and dense-
> orientation certificate. The earlier periodic fallback and the narrower
> lattice-vocabulary investigation are retained in
> [shuriken-twelvefold-problem.md](shuriken-twelvefold-problem.md) as history.

## Acceptance criteria

- Implement all fourteen published prototile states and inflation \(\sqrt{5+2\sqrt3}\).
- Preserve the irrational rotations rather than snapping tiles to twelve directions.
- Generate a gap-free requested patch within the application’s tile budget.
- Test area, state occurrence, orientation density growth, coverage, rendering, and registry integration.
- Cite the exact twelvefold rule and irrational-angle derivation in code comments; attribute reused assets and verify license compatibility.
- Document how its circular diffraction differs from a model-set dodecagonal tiling; typecheck, tests, and build pass.

## References

- [Frettlöh, Say-awen, and de las Peñas, “Substitution tilings with dense tile orientations and n-fold rotational symmetry”](https://doi.org/10.1016/j.indag.2016.11.009) — primary construction.
- [Author preprint (arXiv:1602.00518)](https://arxiv.org/abs/1602.00518) — openly accessible twelvefold rule and figures.
- [Tilings Encyclopedia: 12-fold Shuriken](https://tilings.math.uni-bielefeld.de/substitution/dto_c12/) — fourteen-state rule, inflation, and patch.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project context.
