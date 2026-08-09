# Implement the Squiral tiling

Add the square-based scale-3 squiral inflation and its two-symbol presentation.

> **Status.** Done — `src/tilings/squiral.ts`, registered as `squiral` in the
> Experimental group. The geometric inflation coordinates are read off Eq. (1)
> of arXiv:1205.1384; every tile belongs to a "rosette" of four like-handed
> tiles filling a square of side 2, and inflating a rosette gives nine rosettes
> in a 3×3 block whose four corners flip chirality, which is Eq. (5) of the same
> paper verbatim. That equivalence is checked in the tests, and patches are
> generated from the block rule.

## Acceptance criteria

- Implement the published primitive \(3\times3\) block substitution and the geometric squiral carrier.
- Preserve the two balanced symbol classes that reveal the singular-continuous example.
- Generate a gap-free patch covering the requested disc efficiently.
- Test the exact block rule, scale-3 hierarchy, both symbols, coverage, rendering, and registry integration.
- Cite the exact 3×3 block rule and geometric-carrier construction in code comments; attribute reused assets and verify license compatibility.
- Document the distinction between dynamical and balanced diffraction spectra; typecheck, tests, and build pass.

## References

- [Grimm and Baake, “Squiral diffraction”](https://arxiv.org/abs/1211.5471) — explicit two-symbol block rule and singular-continuous diffraction calculation.
- [Tilings Encyclopedia: Squiral](https://tilings.math.uni-bielefeld.de/substitution/squiral/) — geometric carrier, chirality, and substitution diagram.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project context and further spectral literature.
