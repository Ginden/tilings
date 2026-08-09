# Exact reconstruction of the twelvefold Shuriken substitution

## Result

The published 800×776 rule image determines an exact 14-state primitive substitution
with inflation

\[
\lambda=\sqrt{5+2\sqrt3},\qquad \mu=\lambda^2=5+2\sqrt3.
\]

This is an exact reconstruction of Paz's catalogued rule, rather than a new rule built
only from the rhomb vocabulary. The reconstruction closes, is primitive, is
12-fold symmetric, and contains an explicit dense-tile-orientation certificate.

The machine-readable placement table is `shuriken_exact_rule.json`. Every point is an
8-tuple in

\[
\mathbb Z[\eta],\qquad \eta=e^{i\pi/12},\qquad \eta^8-\eta^4+1=0.
\]

The independent verifier is `verify_shuriken.py`.

## Common expansion convention

Put

\[
\xi=\eta^2=e^{i\pi/6},\qquad z=2+\xi,\qquad
\rho=\frac{z}{\lambda}=e^{i\alpha}.
\]

To express all fourteen rules with the same **real** expansion \(\lambda\), use these
intrinsic prototiles:

\[
\widehat T_1=\rho T_1^0,\quad
\widehat T_2=\rho T_2^0,\quad
\widehat T_i=T_i^0\ (3\le i\le8),\quad
\widehat T_{i+6}=\lambda T_i^0\ (3\le i\le8).
\]

Thus the explicit supports are \(zT_1^0,zT_2^0\), and
\(\mu T_i^0\) for the rules of \(T_{i+6}\). This is the rotational part required by
the paper's construction.

## Exact base prototiles

All vertices below are in \(\mathbb Z[\xi]\). Let

\[
v=(1-\xi)(1-\xi^3)=-\xi+\xi^2-\xi^3.
\]

| State | Vertices of \(T_i^0\) | Area |
|---|---|---:|
| \(T_1\) | regular dodecagon of unit edge | \(6+3\sqrt3\) |
| \(T_2\) | \(0,\,2,\,\xi^3-\xi\) | \(1/2\) |
| \(T_3\) | \(0,\,1-\xi,\,\xi-\xi^3\) | \((\sqrt3-1)/4\) |
| \(T_4\) | \(0,\,1,\,\xi\) | \(1/4\) |
| \(T_5\) | \(0,\,1,\,\xi^2\) | \(\sqrt3/4\) |
| \(T_6\) | \(0,\,v,\,\xi v\) | \((2-\sqrt3)/2\) |
| \(T_7\) | \(0,\,1-\xi,\,\xi^2(1-\xi)\) | \((2\sqrt3-3)/4\) |
| \(T_8\) | \(0,\,1-\xi,\,\xi^3(1-\xi)\) | \((2-\sqrt3)/2\) |

The six placeholder states satisfy \(T_9=\lambda T_3,\ldots,T_{14}=\lambda T_8\).

## Substitution counts

\[
\begin{aligned}
\sigma(T_1)&=T_1+12T_2+144T_3+96T_4+48T_5+48T_6,\\
\sigma(T_2)&=3T_2+2T_3+6T_4+2T_5,\\
\sigma(T_i)&=T_{i+6}\qquad(3\le i\le8),\\
\sigma(T_9)&=32T_3+17T_4+3T_5+10T_6+2T_7+T_8,\\
\sigma(T_{10})&=16T_3+29T_4+16T_5+6T_6,\\
\sigma(T_{11})&=T_1+38T_3+10T_4+19T_5+16T_6,\\
\sigma(T_{12})&=14T_3+10T_4+2T_5+9T_6+12T_7+8T_8,\\
\sigma(T_{13})&=6T_6+37T_7+24T_8,\\
\sigma(T_{14})&=12T_3+10T_4+4T_6+18T_7+17T_8.
\end{aligned}
\]

The raster clips or suppresses four small cells. Exact area forces them uniquely:

- one \(T_4\) at the outward apex of \(\sigma(T_{10})\);
- one \(T_5\) at the outward apex of \(\sigma(T_{11})\);
- two \(T_7\)'s on opposite sides of the short top edge of \(\sigma(T_{13})\).

With these cells restored, every displayed rule has exact area multiplier \(\mu\).

## Primitivity

The resulting \(14\times14\) substitution matrix \(M\) has

\[
M^9>0,\qquad M^8\not>0.
\]

Hence the substitution is primitive, with primitivity exponent \(9\). Its
Perron–Frobenius eigenvalue is exactly

\[
\mu=5+2\sqrt3=\lambda^2,
\]

and the area vector above is a positive left eigenvector.

## Dense tile orientations

There are two \(T_1\) descendants in \(\sigma^3(T_1)\):

1. the central path
   \[
   T_1\to T_1\to T_1\to T_1,
   \]
   whose orientation is \(-3\alpha\) modulo the \(30^\circ\) symmetry of \(T_1\);

2. the path
   \[
   T_1\to T_5\to T_{11}\to T_1,
   \]
   choosing the zero-root-of-unity orientation at both nontrivial placements,
   whose orientation is \(-\alpha\).

Their relative angle is therefore exactly \(2\alpha\) modulo \(\pi/6\).
Theorem 5 gives \(\alpha/\pi\notin\mathbb Q\), so this relative angle is irrational.
Primitivity plus the standard DTO criterion then gives dense tile orientations.

The rule \(\sigma(T_1)\) is invariant under rotation by \(30^\circ\), so the usual
central nesting gives a twelvefold-symmetric element of the hull.

## Verification performed

The verifier checks:

- exact arithmetic in \(\mathbb Z[\eta]\);
- each child polygon is congruent to its state;
- exact support formulas;
- exact area equality using ring identities, without floating-point area arithmetic;
- exact child counts and substitution matrix;
- \(M^9>0\) and \(M^8\not>0\);
- the Perron value \(\lambda^2\);
- polygon union, overlap, and boundary equality as a Shapely cross-check.

All explicit rules pass. The maximum symmetric-difference residual is below
\(8\times10^{-15}\), and all overlap residuals are below \(4\times10^{-15}\).

Run:

```bash
python verify_shuriken.py --require-shapely
```

Expected output:

```text
All exact algebra, congruence, count, area, matrix, and union checks passed.
Primitive exponent: 9; PF eigenvalue: 5 + 2*sqrt(3) = 8.464101615137753
DTO certificate: T1→T1→T1→T1 versus T1→T5→T11→T1 gives relative angle 2*alpha.
```

## Status and scope

This resolves the core construction target by supplying exact coordinates for the
catalogued finite substitution. It does **not** prove that the narrower rhomb-plus-unit-
triangle vocabulary from Problem A can close, nor does it settle the universal shell
tiling question in Problem C. The result is computationally certified but has not been
peer reviewed.
