# The twelvefold Shuriken: what is settled and what is open

> **Historical note (2026-08-09).** This document records the investigation
> which led to the old periodic 4.6.12 fallback. It has been superseded for the
> application by the exact 14-state reconstruction in
> [shuriken_solution.md](../shuriken_solution.md). Its open problems concern the
> narrower lattice recipe, not Paz's reconstructed substitution.

A self-contained statement of the construction problem behind
[shuriken-twelvefold.md](shuriken-twelvefold.md), written so it can be handed to
a prover or a stronger search without re-deriving anything. Everything below was
computed in exact integer arithmetic and checked numerically; the failures are
reported as what they are (exhaustive search, or search-with-a-budget) so that
nothing here is mistaken for a theorem it is not.

## 1. Goal

Frettlöh, Say-awen and de las Peñas prove that primitive substitution tilings
with **dense tile orientations** (DTO — the tile orientations are dense in the
circle) invariant under \(n\)-fold rotation exist for \(n \in \{2,3,4,5,6,8\}\).
They explicitly do **not** construct \(n = 12\), and close by saying their method
"might yield further primitive substitution tilings with 11-fold and also 12-fold
rotational symmetry (though the number of prototiles might be huge)".

The 12-fold Shuriken is Skezeer John B. Paz's answer: 14 prototile states,
inflation \(\lambda = \sqrt{5 + 2\sqrt3}\). It is catalogued in the Tilings
Encyclopedia as `dto_c12`, but the **only** published record is two raster
images (an 800×776 substitution diagram and a patch), CC BY-NC-SA 2.0. No
coordinates, no rule table, no source data are published anywhere; probes for
PDF/EPS/SVG versions of the rule diagram all 404. At 800px the substitution of
\(T_1^{(12)}\) alone holds roughly 300 tiles at irrational relative angles, i.e.
about 15px per tile, so the vertex positions are not recoverable to the precision
that exact reconstruction needs.

**The goal is therefore to construct a 12-fold DTO substitution from the paper's
recipe rather than to transcribe Paz's.**

## 2. Exact setting

Let \(\xi = e^{i\pi/6}\), a primitive 12th root of unity, with minimal polynomial
\(\xi^4 = \xi^2 - 1\). Represent points of \(\mathbb{Z}[\xi]\) as integer
4-tuples \((c_0,c_1,c_2,c_3) \mapsto c_0 + c_1\xi + c_2\xi^2 + c_3\xi^3\).

Set

$$z = 2 + \xi, \qquad \lambda = |z| = \sqrt{5 + 2\sqrt3} \approx 2.909313,
\qquad \alpha = \arg z = \arg(2+\xi) \approx 9.8967^\circ .$$

\(\lambda\) is the paper's inflation factor for \(n = 12\): for even \(n\),
\(\lambda_n = \sqrt{5 + 4\cos(2\pi/n)}\), and \(\cos(\pi/6) = \sqrt3/2\).

**Everything in the construction is an exact lattice point.** The unit dodecagon
centred at the origin has vertices \(u_k = u_0 + \sum_{j<k}\xi^j\) with

$$u_0 = \frac{1}{\xi - 1} = -\xi^2 - \xi^3 ,$$

which lies in \(\mathbb{Z}[\xi]\) because \(N(\xi-1) = \Phi_{12}(1) = 1\), so
\(\xi - 1\) is a unit. Since \(z \in \mathbb{Z}[\xi]\), every vertex produced by
inflating and dissecting stays in \(\mathbb{Z}[\xi]\), and all gap-freeness
claims below are exact integer identities, not floating-point near-misses.

### Prototiles

* \(T_1\): regular dodecagon, unit edge. Area \(6 + 3\sqrt3\).
* \(T_2\): the triangle with edges 1 and 2 meeting at \(150^\circ = \frac{n-2}{n}\pi\);
  its third edge has length \(\lambda\). Area \(\tfrac12\). Its other two angles
  are \(\alpha\) and \(20.103^\circ\), **irrational** multiples of \(\pi\) by the
  paper's Theorem 5.
* \(P\): the Theorem-5 parallelogram, edges 1 and 2 at \(30^\circ\), area 1. It is
  exactly two copies of \(T_2\) glued on the long diagonal.
* \(R_1, R_2, R_3\): unit rhombi of angle \(30^\circ, 60^\circ, 90^\circ\).

### The edge-splitting identity

The whole construction rests on one identity:

$$z\,\xi^k = 2\xi^k + \xi^{k+1}.$$

So an inflated unit edge (length \(\lambda\), direction \(z\xi^k\), an irrational
angle) is spanned by a two-step lattice path — and the triangle between the chord
and that path **is exactly \(T_2\)**. For a tile \(Q\) traversed counter-clockwise
the apex must fall on the interior side, which forces the order
\((\xi^{k+1},\,2\xi^k)\); the other order puts the apex outside. Hence for any
lattice polygon \(Q\) with boundary word \(W\) (a cyclic list of unit-step
directions),

$$z\cdot Q \;=\; \operatorname{Infl}(Q)\ \cup\ \{\,T_2 \text{ on each unit step of } \partial Q\,\},$$

where \(\operatorname{Infl}(Q)\) is the lattice polygon whose boundary word is
\(W\) with every step \(d\) replaced by \(d+1,\,d,\,d\). Areas:
\(|\operatorname{Infl}(Q)| = \lambda^2 |Q| - \tfrac12\,|W|\).

Two tiles sharing an edge each emit a \(T_2\) on their own side of it, and the
two glue into the parallelogram \(P\) — so \(P\), not \(T_2\), is the natural
prototile of the interior, and every \(P\) is a Theorem-5 parallelogram.

## 3. Settled: the \(n=12\) supertile

`Infl` applied to the unit dodecagon gives a 24-gon with alternating steps
\(\xi^{k+1}\) and \(2\xi^k\), interior angles alternating \(120^\circ\) and
\(210^\circ\): the **12-fold shuriken star**. It contains the unit dodecagon
\(T_1\) in its original position and orientation, and the annulus between them
is tiled by rhombi. Concretely:

$$\lambda\,T_1 \;=\; \underbrace{12\,T_2}_{\text{rim}} \;\cup\;
\underbrace{T_1}_{\text{centre, unrotated}} \;\cup\; \underbrace{96\ \text{rhombi}}_{\text{annulus}} .$$

The 96 rhombi are 48 of \(60^\circ\), 24 of \(90^\circ\), 24 of \(30^\circ\),
falling into **exactly 8 orbits of 12** under rotation by \(\xi\), so the
dissection is genuinely 12-fold symmetric. Orbit representatives, as
\(\mathbb{Z}[\xi]\) start vertex plus the two edge directions:

| start \((c_0,c_1,c_2,c_3)\) | edge dirs | angle |
| --- | --- | --- |
| `(3, 1, -3, -3)` | 2, 6 | 120° |
| `(2, 1, -3, -3)` | 2, 6 | 120° |
| `(3, 1, -2, -3)` | 3, 6 | 90° |
| `(2, 1, -2, -3)` | 3, 6 | 90° |
| `(3, 1, -2, -2)` | 4, 6 | 60° |
| `(2, 1, -2, -2)` | 4, 6 | 60° |
| `(2, 1, -1, -2)` | 5, 6 | 30° |
| `(0, 0, -1, -1)` | 11, 0 | 30° |

A rhomb with start \(p\) and dirs \((a,b)\) has vertices
\(p,\ p+\xi^a,\ p+\xi^a+\xi^b,\ p+\xi^b\). The full patch is the 12 rotations of
each row, plus \(T_1\) (vertices \(u_k\)) and the 12 rim triangles
\((z u_k,\; z u_k + \xi^{k+1},\; z u_{k+1})\).

**Verification.** 109 tiles. Area \(48 + 27\sqrt3 = 94.765371804\), matching
\(\lambda^2(6+3\sqrt3)\) to every printed digit. 4000 pseudo-random points inside
the supertile: 0 gaps, 0 overlaps. Exactly three edge lengths occur — 1, 2 and
\(\lambda = 2.909313\) — as the theory demands.

This is the \(n = 12\) case of the paper's Figure 3 ("a regular \(n\)-gon of side
length \(\lambda_n\) can be dissected into copies of \(T_2\) along its edges, one
regular \(n\)-gon with unit edge length in its centre, and several
parallelograms"). The "several parallelograms" are these 96 rhombi.

## 4. Open problem A: the rule does not close

A substitution needs every prototile it emits to have its own inflation rule.
\(T_1\) does. The rhombi do not, and this is not a search failure:

* Inflating a rhomb is forced (§2), and produces a centrally symmetric octagon
  which, after the degenerate spikes at the \(30^\circ\) corners cancel, is a
  centrally symmetric **hexagon whose edge directions run \(0, 2, 1\) instead of
  \(0, 1, 2\)** — a non-convex "twisted" zonogon.
* For \(R_1\) and \(R_2\) an exhaustive backtracking search with memoisation on
  the frontier state finds **no** rhombus tiling. Zone balance (equal counts of
  direction \(d\) and \(d+6\) on the boundary) is satisfied, so balance is
  necessary but not sufficient here; the obstruction is the twist.
* Adding unit equilateral triangles to the vocabulary rescues the \(90^\circ\)
  rhomb (11 tiles: 4×\(R_1\), 2×\(R_2\), 1×\(R_3\), 4 triangles) and the
  parallelogram \(P\) (8 rhombi), but **not** \(R_1\) or \(R_2\).

> **Problem A.** Find a finite set \(V\) of lattice polygons, containing \(T_1\)
> and closed under the operation \(Q \mapsto \operatorname{Infl}(Q)\) dissected
> into copies of members of \(V\) — or prove no such \(V\) exists over the rhomb
> and unit-triangle vocabulary.

Useful constraints already established. A tile all of whose corners are
\(\ge 120^\circ\) survives the rim: the two \(T_2\)s at a corner of interior
angle \(\theta\) consume exactly \(30^\circ\), leaving \(\theta - 30^\circ\). At
\(\theta = 60^\circ\) that leaves a \(30^\circ\) wedge, which forces an \(R_1\)
(not closable); at \(\theta = 30^\circ\) it leaves nothing and the interior
pinches to a slit. So the \(60^\circ\)-cornered tiles — the unit equilateral
triangle and \(R_2\) — are the choke points.

## 5. Open problem B: one frame gives no dense orientations

Even a rule that closed this way would **not** be DTO, and this is worth stating
because it is easy to miss.

If every tile's interior is dissected on that tile's own lattice, then all
children of a tile sit at \(-\alpha + 30^\circ\mathbb{Z}\) relative to it. By
induction every tile of \(\sigma^k(T_1)\) lies in the single rotated lattice
\(L_{-k\alpha}\), so a finite patch — and hence the fixed point — has **12 tile
orientations, not a dense set**. The irrational \(\alpha\) shows up only as a
global rotation per generation, which is invisible in the tiling.

The paper's mechanism is different. Its \(\sigma(T_2)\) contains copies of
\(T_2\), and a child \(T_2\) can be seated with its **\(\lambda\)-edge** along an
inflated *unit* edge of the parent (both have length \(\lambda\)), which puts
that child's own lattice at \(+\alpha\) relative to a child seated the ordinary
way. Two lattice frames then coexist inside one supertile, meeting exactly along
\(\lambda\)-edges — where the neighbour across the edge is the mirror \(T_2\),
which is why \(\lambda\)-edges are the only legal interface between frames. That
is the source of both DTO and the FLC subtleties, and it is what
"copies of \(T_2\) are lined up along the boundary of \(\sigma_n(T_1)\) … the
boundaries of \(\sigma_n(T_1)\) and \(\sigma_n^3(T_1)\) are rotated against each
other by \(2\alpha\)" is describing.

> **Problem B.** Build a rule in which at least one prototile's dissection seats
> children on \(\lambda\)-edges, so that two lattice frames differing by \(\alpha\)
> coexist. By the paper's Theorem 4 this gives DTO as soon as some \(\sigma^k(T_i)\)
> contains two equivalent tiles at an irrational relative angle, and \(2\alpha\)
> is irrational by Theorem 5.

## 6. Open problem C: nested shells stall at ring 2

A closed rule is not the only way to fill the plane. Setting \(Sh_0 = T_1\) and
\(Sh_k = \operatorname{Infl}(Sh_{k-1})\) gives nested 12-fold shells, each the
shuriken star of the one inside it, turned by the irrational \(\alpha\). Every
shell is a lattice polygon, so each ring \(Sh_k \setminus Sh_{k-1}\) is a lattice
region and the tiles stay unit size. Ring 1 is precisely §3 and is exact.

Ring 2 (area \(312 + 192\sqrt3\)) and ring 3 (area \(2676 + 1584\sqrt3\)) defeat
every corner-peeling heuristic tried — sharpest-first, flattest-first,
innermost, outermost and combinations — always leaving 12 congruent holes.
Divisibility is not the obstruction: \(n_2 = 384\) and \(n_1/2 + n_3 = 312\) admit
solutions with all counts divisible by 12. Backtracking at orbit level did not
terminate within budget, so **no impossibility is claimed for ring \(k \ge 2\)** —
only that greedy peeling fails.

> **Problem C.** Decide whether \(\operatorname{Infl}(Q) \setminus Q\) is
> tileable by unit rhombi (and triangles) for every lattice polygon \(Q\), or at
> least for \(Q = Sh_k\); and if so give a construction rather than a search.

A caution for anyone re-running this: a locally convex corner of the frontier is
**not** sufficient grounds to place a rhomb. Where the region is thin the rhomb
can reach through and out the far side. Two separate over-coverage bugs came from
this — one from pairing an incoming boundary edge with the wrong outgoing edge at
a vertex where several strands meet (the correct partner is the first outgoing
edge clockwise from the reverse of the incoming one), and one that needs an
outright containment test on the tile's centre. With both fixes, ring 1 closes
exactly and rings 2–3 honestly fail instead of silently over-covering by
\(12 \times \frac{2-\sqrt3}{2}\).

## 7. What was shipped instead

Since \(\operatorname{Infl}\) closes on the three cells of the **4.6.12
Archimedean tiling** — dodecagon (109 tiles), regular hexagon (6 rim \(T_2\) +
33), square (4 rim \(T_2\) + 11) — the supertile can be laid out on that
periodic pattern and fill the plane exactly, with no closing substitution
needed. `src/tilings/shuriken.ts` does this: dodecagon centres on a triangular
lattice, six squares on each dodecagon's even edges and six hexagons on its odd
ones, every cell inflated by \(z\) and dissected. Adjacent cells contribute one
\(T_2\) each to every shared edge, so the Theorem-5 parallelograms appear
throughout. The result is **periodic** and has 12 tile orientations; it displays
the genuine \(n = 12\) dissection but is not an aperiodic tiling and is not the
Shuriken.

The unit equilateral triangle is *not* available as a cell: at a \(60^\circ\)
corner the two \(T_2\)s consume the whole angle, the interior degenerates, and
the search confirms no dissection. That rules out the 3.12.12 layout and leaves
4.6.12 as the only Archimedean option.

## 8. What a Lean formalisation could pin down

1. \(u_0 = 1/(\xi-1) \in \mathbb{Z}[\xi]\), hence every construction vertex is a
   lattice point (short, and it underwrites all exactness claims).
2. The splitting identity \(z\xi^k = 2\xi^k + \xi^{k+1}\) and that the resulting
   triangle is congruent to \(T_2\), with the interior-side order forced.
3. The §3 dissection: the 109 listed tiles have pairwise disjoint interiors and
   union exactly \(z \cdot T_1\). This is a finite check over \(\mathbb{Z}[\xi]\)
   and should be fully mechanisable.
4. Theorem 5 for \(n = 12\): \(\alpha = \arg(2+\xi) \notin \pi\mathbb{Q}\). The
   paper's proof is short — if \(\alpha\) were rational then \(\bar z/z\) is a
   root of unity in \(\mathbb{Q}(\xi)\), hence \(\pm\xi^k\), forcing
   \(\alpha \in \frac{\pi}{12}\mathbb{Z}\), contradicting
   \(0 < \alpha < \pi/12\).
5. The §5 induction: single-frame dissection ⟹ at most 12 tile orientations.
   This is the statement that would justify not chasing that family further.

## References

- [Frettlöh, Say-awen and de las Peñas, "Substitution tilings with dense tile orientations and n-fold rotational symmetry", Indagationes Mathematicae 28 (2017) 120–131](https://doi.org/10.1016/j.indag.2016.11.009)
- [Author preprint, arXiv:1602.00518](https://arxiv.org/abs/1602.00518) — Theorem 5 (irrational angles in cyclotomic parallelograms) is §3; the dissection recipe is §4 and Figure 3.
- [Tilings Encyclopedia, 12-fold Shuriken (`dto_c12`)](https://tilings.math.uni-bielefeld.de/substitution/dto_c12/) — Paz's 14-state rule, images only, CC BY-NC-SA 2.0.
- [Local catalogue entry](../rare-aperiodic-tilings.md) — project context, and the fivefold sibling in [shuriken-fivefold.md](shuriken-fivefold.md).
