# Implement the Mampusti–Whittaker dendrite monotile

Add the decorated hexagonal monotile whose two adjacency rules force a nonperiodic dendrite.

## Acceptance criteria

- Implement the published hexagonal decoration and both nearest-neighbor adjacency rules.
- Represent the dendrite connections visibly and preserve their global nonperiodic growth.
- Generate a legal requested patch without substituting a periodic decorated honeycomb.
- Test adjacency rules, dendrite connectivity, absence of short translational periods, coverage, rendering, and registry integration.
- Cite the paper’s precise tile decoration and both adjacency rules in code comments; attribute reused artwork and comply with its license.
- Document which matching rule can be realized geometrically; typecheck, tests, and build pass.

## References

- [Mampusti and Whittaker, “An aperiodic monotile that forces nonperiodicity through dendrites” (2020)](https://eprints.gla.ac.uk/181159/) — primary peer-reviewed construction and openly licensed manuscript.
- [Author preprint (arXiv:1903.01158)](https://arxiv.org/abs/1903.01158) — accessible version of the rules and figures.
- [Local rare-tilings literature catalog](../rare-aperiodic-tilings.md) — project context and related monotiles.
