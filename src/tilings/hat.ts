/**
 * The "hat" aperiodic monotile (Smith, Myers, Kaplan, Goodman-Strauss, 2023).
 *
 * The H/T/P/F metatile construction below is a TypeScript port of Craig S.
 * Kaplan's reference implementation, `hatviz` (https://github.com/isohedral/hatviz).
 *
 * BSD 3-Clause License. Copyright (c) 2023, Craig S. Kaplan.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the conditions of the BSD 3-Clause
 * licence are met; see THIRD-PARTY-LICENSES.md in this repository for the full
 * text.
 */
import type { Affine, Vec } from '../geometry.js';
import {
  IDENTITY,
  add,
  apply,
  area,
  bounds,
  centroid,
  intersect,
  matchTwo,
  mul,
  rotateAbout,
  rotation,
  sub,
  translation,
} from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

const HR3 = Math.sqrt(3) / 2;

function hexPt(x: number, y: number): Vec {
  return { x: x + 0.5 * y, y: HR3 * y };
}

/** The hat outline on the kite grid, 13 vertices. */
export const HAT_OUTLINE: readonly Vec[] = [
  hexPt(0, 0),
  hexPt(-1, -1),
  hexPt(0, -2),
  hexPt(2, -2),
  hexPt(2, -1),
  hexPt(4, -2),
  hexPt(5, -1),
  hexPt(4, 0),
  hexPt(3, 0),
  hexPt(2, 2),
  hexPt(0, 3),
  hexPt(0, 2),
  hexPt(-1, 2),
];

export const HAT_LABELS = ['H1', 'H', 'T', 'P', 'F'] as const;
export type HatLabel = (typeof HAT_LABELS)[number];

interface Leaf {
  readonly type: 'hat';
  readonly label: HatLabel;
}

interface Child {
  readonly transform: Affine;
  readonly geom: Geom;
}

interface Meta {
  readonly type: 'meta';
  shape: Vec[];
  children: Child[];
}

type Geom = Leaf | Meta;

function leaf(label: HatLabel): Leaf {
  return { type: 'hat', label };
}

function meta(shape: Vec[]): Meta {
  return { type: 'meta', shape, children: [] };
}

function addChild(m: Meta, transform: Affine, geom: Geom): void {
  m.children.push({ transform, geom });
}

function evalChild(m: Meta, childIndex: number, vertexIndex: number): Vec {
  const child = m.children[childIndex]!;
  const shape = (child.geom as Meta).shape;
  return apply(child.transform, shape[vertexIndex]!);
}

function recentre(m: Meta): void {
  const c = centroid(m.shape);
  m.shape = m.shape.map((p) => sub(p, c));
  const shift = translation(-c.x, -c.y);
  m.children = m.children.map((ch) => ({ ...ch, transform: mul(shift, ch.transform) }));
}

const H1_HAT = leaf('H1');
const H_HAT = leaf('H');
const T_HAT = leaf('T');
const P_HAT = leaf('P');
const F_HAT = leaf('F');

function makeHInit(): Meta {
  const outline = [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 4.5, y: HR3 },
    { x: 2.5, y: 5 * HR3 },
    { x: 1.5, y: 5 * HR3 },
    { x: -0.5, y: HR3 },
  ];
  const m = meta(outline);
  addChild(m, matchTwo(HAT_OUTLINE[5]!, HAT_OUTLINE[7]!, outline[5]!, outline[0]!), H_HAT);
  addChild(m, matchTwo(HAT_OUTLINE[9]!, HAT_OUTLINE[11]!, outline[1]!, outline[2]!), H_HAT);
  addChild(m, matchTwo(HAT_OUTLINE[5]!, HAT_OUTLINE[7]!, outline[3]!, outline[4]!), H_HAT);
  addChild(
    m,
    mul(
      translation(2.5, HR3),
      mul([-0.5, -HR3, 0, HR3, -0.5, 0], [0.5, 0, 0, 0, -0.5, 0]),
    ),
    H1_HAT,
  );
  return m;
}

function makeTInit(): Meta {
  const outline = [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 1.5, y: 3 * HR3 },
  ];
  const m = meta(outline);
  addChild(m, [0.5, 0, 0.5, 0, 0.5, HR3], T_HAT);
  return m;
}

function makePInit(): Meta {
  const outline = [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 3, y: 2 * HR3 },
    { x: -1, y: 2 * HR3 },
  ];
  const m = meta(outline);
  addChild(m, [0.5, 0, 1.5, 0, 0.5, HR3], P_HAT);
  addChild(
    m,
    mul(translation(0, 2 * HR3), mul([0.5, HR3, 0, -HR3, 0.5, 0], [0.5, 0, 0, 0, 0.5, 0])),
    P_HAT,
  );
  return m;
}

function makeFInit(): Meta {
  const outline = [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 3.5, y: HR3 },
    { x: 3, y: 2 * HR3 },
    { x: -1, y: 2 * HR3 },
  ];
  const m = meta(outline);
  addChild(m, [0.5, 0, 1.5, 0, 0.5, HR3], F_HAT);
  addChild(
    m,
    mul(translation(0, 2 * HR3), mul([0.5, HR3, 0, -HR3, 0.5, 0], [0.5, 0, 0, 0, 0.5, 0])),
    F_HAT,
  );
  return m;
}

type RuleName = 'H' | 'T' | 'P' | 'F';
type Rule =
  | [RuleName]
  | [number, number, RuleName, number]
  | [number, number, number, number, RuleName, number];

const PATCH_RULES: readonly Rule[] = [
  ['H'],
  [0, 0, 'P', 2],
  [1, 0, 'H', 2],
  [2, 0, 'P', 2],
  [3, 0, 'H', 2],
  [4, 4, 'P', 2],
  [0, 4, 'F', 3],
  [2, 4, 'F', 3],
  [4, 1, 3, 2, 'F', 0],
  [8, 3, 'H', 0],
  [9, 2, 'P', 0],
  [10, 2, 'H', 0],
  [11, 4, 'P', 2],
  [12, 0, 'H', 2],
  [13, 0, 'F', 3],
  [14, 2, 'F', 1],
  [15, 3, 'H', 4],
  [8, 2, 'F', 1],
  [17, 3, 'H', 0],
  [18, 2, 'P', 0],
  [19, 2, 'H', 2],
  [20, 4, 'F', 3],
  [20, 0, 'P', 2],
  [22, 0, 'H', 2],
  [23, 4, 'F', 3],
  [23, 0, 'F', 3],
  [16, 0, 'P', 2],
  [9, 4, 0, 2, 'T', 2],
  [4, 0, 'F', 3],
];

function constructPatch(h: Meta, t: Meta, p: Meta, f: Meta): Meta {
  const shapes: Record<RuleName, Meta> = { H: h, T: t, P: p, F: f };
  const out = meta([]);

  for (const rule of PATCH_RULES) {
    if (rule.length === 1) {
      addChild(out, IDENTITY, shapes[rule[0]]);
    } else if (rule.length === 4) {
      const [childIndex, edgeIndex, name, targetEdge] = rule;
      const child = out.children[childIndex]!;
      const poly = (child.geom as Meta).shape;
      const pp = apply(child.transform, poly[(edgeIndex + 1) % poly.length]!);
      const qq = apply(child.transform, poly[edgeIndex]!);
      const next = shapes[name];
      const npoly = next.shape;
      addChild(
        out,
        matchTwo(npoly[targetEdge]!, npoly[(targetEdge + 1) % npoly.length]!, pp, qq),
        next,
      );
    } else {
      const [pIndex, pEdge, qIndex, qEdge, name, targetEdge] = rule;
      const chP = out.children[pIndex]!;
      const chQ = out.children[qIndex]!;
      const pp = apply(chQ.transform, (chQ.geom as Meta).shape[qEdge]!);
      const qq = apply(chP.transform, (chP.geom as Meta).shape[pEdge]!);
      const next = shapes[name];
      const npoly = next.shape;
      addChild(
        out,
        matchTwo(npoly[targetEdge]!, npoly[(targetEdge + 1) % npoly.length]!, pp, qq),
        next,
      );
    }
  }
  return out;
}

function constructMetatiles(patch: Meta): [Meta, Meta, Meta, Meta] {
  const bps1 = evalChild(patch, 8, 2);
  const bps2 = evalChild(patch, 21, 2);
  const rbps = apply(rotateAbout(bps1, (-2 * Math.PI) / 3), bps2);

  const p72 = evalChild(patch, 7, 2);
  const p252 = evalChild(patch, 25, 2);

  const llc = intersect(bps1, rbps, evalChild(patch, 6, 2), p72);
  let w = sub(evalChild(patch, 6, 2), llc);

  const hOutline: Vec[] = [llc, bps1];
  w = apply(rotation(-Math.PI / 3), w);
  hOutline.push(add(hOutline[1]!, w));
  hOutline.push(evalChild(patch, 14, 2));
  w = apply(rotation(-Math.PI / 3), w);
  hOutline.push(sub(hOutline[3]!, w));
  hOutline.push(evalChild(patch, 6, 2));

  const newH = meta(hOutline);
  for (const i of [0, 9, 16, 27, 26, 6, 1, 8, 10, 15]) {
    const ch = patch.children[i]!;
    addChild(newH, ch.transform, ch.geom);
  }

  const newP = meta([p72, add(p72, sub(bps1, llc)), bps1, llc]);
  for (const i of [7, 2, 3, 4, 28]) {
    const ch = patch.children[i]!;
    addChild(newP, ch.transform, ch.geom);
  }

  const newF = meta([
    bps2,
    evalChild(patch, 24, 2),
    evalChild(patch, 25, 0),
    p252,
    add(p252, sub(llc, bps1)),
  ]);
  for (const i of [21, 20, 22, 23, 24, 25]) {
    const ch = patch.children[i]!;
    addChild(newF, ch.transform, ch.geom);
  }

  const aaa = hOutline[2]!;
  const bbb = add(hOutline[1]!, sub(hOutline[4]!, hOutline[5]!));
  const ccc = apply(rotateAbout(bbb, -Math.PI / 3), aaa);
  const newT = meta([bbb, ccc, aaa]);
  const ch11 = patch.children[11]!;
  addChild(newT, ch11.transform, ch11.geom);

  recentre(newH);
  recentre(newP);
  recentre(newF);
  recentre(newT);

  return [newH, newT, newP, newF];
}

function flatten(geom: Geom, transform: Affine, out: Tile[]): void {
  if (geom.type === 'hat') {
    out.push({
      kind: HAT_LABELS.indexOf(geom.label),
      points: HAT_OUTLINE.map((v) => apply(transform, v)),
    });
    return;
  }
  for (const child of geom.children) {
    flatten(child.geom, mul(transform, child.transform), out);
  }
}

/** Half of the smaller side of the supertile's bounding box. */
function coverRadius(m: Meta): number {
  const b = bounds(m.shape);
  return Math.min(b.maxX - b.minX, b.maxY - b.minY) / 2;
}

const MAX_LEVELS = 12;

export function buildHatPatch(radius: number): Tile[] {
  let tiles: [Meta, Meta, Meta, Meta] = [makeHInit(), makeTInit(), makePInit(), makeFInit()];
  for (let level = 0; level < MAX_LEVELS && coverRadius(tiles[0]) < radius; level++) {
    tiles = constructMetatiles(constructPatch(tiles[0], tiles[1], tiles[2], tiles[3]));
  }
  const out: Tile[] = [];
  flatten(tiles[0], IDENTITY, out);
  return out;
}

export const hat: TilingDefinition = {
  id: 'hat',
  name: 'Hat monotile (einstein)',
  family: 'monotile',
  description:
    'The 2023 "hat": a single 13-sided tile that tiles the plane only aperiodically. Built from H/T/P/F metatiles; reflected hats form their own class.',
  kinds: 5,
  kindLabels: ['reflected hat', 'H hat', 'T hat', 'P hat', 'F hat'],
  reference: 'https://en.wikipedia.org/wiki/Einstein_problem',
  unitTileArea: area(HAT_OUTLINE),
  generate(radius) {
    return buildHatPatch(radius);
  },
};
