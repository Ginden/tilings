# Implement the Jeandel–Rao 11 Wang tiles

Add the minimal known eleven-tile, four-color aperiodic Wang set.

## Acceptance criteria

- Encode the exact eleven tiles and native four-color edge rules.
- Generate patches from a documented legal configuration or recognizable minimal-component construction.
- Verify every horizontal and vertical adjacency and avoid periodic proxy patterns.
- Test all tiles/colors, legal edges, patch growth, rendering, and registry integration.
- Cite the exact edge tuples and identify which documented configuration/component seeds patch generation; attribute reused assets and verify license compatibility.
- Document the distinction between the full shift and its minimal substitutive core; typecheck, tests, and build pass.

## References

- [Jeandel and Rao, “An aperiodic set of 11 Wang tiles” (2021)](https://www.advancesincombinatorics.com/article/18614-an-aperiodic-set-of-11-wang-tiles) — primary tile set and minimality result.
- [Author preprint (arXiv:1506.06492)](https://arxiv.org/abs/1506.06492) — openly accessible tile definitions and proof.
- [Labbé, “Substitutive structure of Jeandel–Rao aperiodic tilings”](https://arxiv.org/abs/1808.07768) — construction of a substitutive minimal component.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project context.
