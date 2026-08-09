import { area } from '../geometry.js';
import type { Vec } from '../geometry.js';
import type { Tile, TilingDefinition } from './types.js';

type MacroKind = '1' | '2';
type MacroOp = readonly [MacroKind, string, string, string, string, string];

interface MacroTemplate {
  readonly a: Vec;
  readonly b: Vec;
  readonly polygon: readonly Vec[];
  readonly anchors: readonly [Vec, Vec, Vec];
}

/**
 * Two congruent, opposite-handed placements of the classic nonagon. These
 * normalized construction tools and the recurrence below reproduce the
 * beak-to-butt layers described by Adams, Lopez, Mann, and Tran (2020).
 *
 * The anchor recurrence was independently checked against Rousseau-Wallon's
 * public GeoGebra construction: https://www.geogebra.org/m/zhq3Ywhu
 */
const MACROS: Record<MacroKind, MacroTemplate> = {
  '1': {
    a: { x: 0.5883527071324377, y: 1.4124550363153074 },
    b: { x: 0.5841864518964093, y: 1.7040929028372909 },
    polygon: [
      { x: 0.5883527071324377, y: 1.4124550363153074 },
      { x: 0.2997536484189719, y: 1.3702580437460814 },
      { x: -0.23690237903850636, y: 1.8762859034956458 },
      { x: -0.525501437751972, y: 1.83408891092642 },
      { x: -0.5213351825159473, y: 1.5424510444044364 },
      { x: -0.6008409101762952, y: 1.8230732854000211 },
      { x: -0.33299701124520936, y: 1.93852738310807 },
      { x: 0.31634255296532277, y: 1.5886388051292417 },
      { x: 0.5841864518964093, y: 1.7040929028372909 },
    ],
    anchors: [
      { x: -0.5213351825159473, y: 1.5424510444044364 },
      { x: -0.6008409101762952, y: 1.8230732854000211 },
      { x: -0.525501437751972, y: 1.83408891092642 },
    ],
  },
  '2': {
    a: { x: -2.932844635115863, y: 2.8533647262119346 },
    b: { x: -3.136117760854791, y: 2.644199625813919 },
    polygon: [
      { x: -3.136117760854791, y: 2.644199625813919 },
      { x: -2.932844635115863, y: 2.8533647262119346 },
      { x: -2.6989365040641453, y: 2.6791321543429616 },
      { x: -2.6772791189825784, y: 1.941843307064907 },
      { x: -2.443370987930857, y: 1.7676107351959305 },
      { x: -2.6938536614263815, y: 1.618183719061896 },
      { x: -2.8746968583113626, y: 1.8470193391314282 },
      { x: -2.7047918904742874, y: 2.5647910218784222 },
      { x: -2.8856350873592675, y: 2.7936266419479536 },
    ],
    anchors: [
      { x: -2.6938536614263815, y: 1.618183719061896 },
      { x: -2.443370987930857, y: 1.7676107351959305 },
      { x: -2.8856350873592675, y: 2.7936266419479536 },
    ],
  },
};

const INNER_LAYER: readonly MacroOp[] = [
  ['1', 'A', 'B', 'A_1', 'B_1', 'C_1'],
  ['1', 'B', 'C', 'D_1', 'E_1', 'F_1'],
  ['1', 'C', 'D', 'G_1', 'H_1', 'I_1'],
  ['1', 'D', 'E', 'J_1', 'K_1', 'L_1'],
  ['1', 'E', 'F', 'M_1', 'N_1', 'O_1'],
  ['1', 'F', 'G', 'P_1', 'Q_1', 'R_1'],
  ['1', 'G', 'H', 'S_1', 'T_1', 'U_1'],
  ['1', 'H', 'I', 'V_1', 'W_1', 'Z_1'],
  ['1', 'I', 'J', 'A_2', 'B_2', 'C_2'],
  ['1', 'J', 'K', 'D_2', 'E_2', 'F_2'],
  ['1', 'K', 'L', 'G_2', 'H_2', 'I_2'],
  ['1', 'L', 'M', 'J_2', 'K_2', 'L_2'],
  ['1', 'M', 'N', 'M_2', 'N_2', 'O_2'],
  ['2', 'N', 'O', 'P_2', 'Q_2', 'R_2'],
];

const OUTER_LAYERS: readonly MacroOp[] = [
  ['1', 'C_1', 'A_1', 'Q_3', 'R_3', 'S_3'],
  ['1', 'A_1', 'N_2', 'T_3', 'U_3', 'V_3'],
  ['1', 'N_2', 'T_2', 'W_3', 'Z_3', 'A_4'],
  ['1', 'T_2', 'U_2', 'B_4', 'C_4', 'D_4'],
  ['1', 'U_2', 'V', 'E_4', 'F_4', 'G_4'],
  ['1', 'V', 'W_2', 'H_4', 'I_4', 'J_4'],
  ['1', 'W_2', 'Z_2', 'K_4', 'L_4', 'M_4'],
  ['1', 'Z_2', 'A_3', 'N_4', 'O_4', 'P_4'],
  ['1', 'A_3', 'B_3', 'Q_4', 'R_4', 'S_4'],
  ['1', 'B_3', 'C_3', 'T_4', 'U_4', 'V_4'],
  ['1', 'C_3', 'D_3', 'W_4', 'Z_4', 'A_5'],
  ['1', 'D_3', 'E_3', 'B_5', 'C_5', 'D_5'],
  ['1', 'E_3', 'F_3', 'E_5', 'F_5', 'G_5'],
  ['2', 'D', 'C', 'H_5', 'I_5', 'J_5'],
  ['2', 'J_5', 'C', 'K_5', 'L_5', 'M_5'],
  ['1', 'M_5', 'C', 'N_5', 'O_5', 'P_5'],
  ['2', 'T_2', 'N_2', 'Q_5', 'R_5', 'S_5'],
  ['1', 'R_2', 'O', 'T_5', 'U_5', 'V_5'],
  ['2', 'U_2', 'T_2', 'W_5', 'Z_5', 'A_6'],
  ['2', 'A_6', 'T_2', 'B_6', 'C_6', 'D_6'],
  ['2', 'R_5', 'W_5', 'E_6', 'F_6', 'G_6'],
  ['2', 'V', 'U_2', 'H_6', 'I_6', 'J_6'],
  ['2', 'J_6', 'U_2', 'K_6', 'L_6', 'M_6'],
  ['2', 'Z_5', 'H_6', 'N_6', 'O_6', 'P_6'],
  ['2', 'W_2', 'V', 'Q_6', 'R_6', 'S_6'],
  ['2', 'S_6', 'V', 'T_6', 'U_6', 'V_6'],
  ['2', 'I_6', 'Q_6', 'W_6', 'Z_6', 'A_7'],
  ['2', 'Z_2', 'W_2', 'B_7', 'C_7', 'D_7'],
  ['2', 'D_7', 'W_2', 'E_7', 'F_7', 'G_7'],
  ['2', 'R_6', 'B_7', 'H_7', 'I_7', 'J_7'],
  ['2', 'A_3', 'Z_2', 'K_7', 'L_7', 'M_7'],
  ['2', 'M_7', 'Z_2', 'N_7', 'O_7', 'P_7'],
  ['2', 'C_7', 'K_7', 'Q_7', 'R_7', 'S_7'],
  ['2', 'B_3', 'A_3', 'T_7', 'U_7', 'V_7'],
  ['2', 'V_7', 'A_3', 'W_7', 'Z_7', 'A_8'],
  ['2', 'L_7', 'T_7', 'B_8', 'C_8', 'D_8'],
  ['2', 'E', 'D', 'E_8', 'F_8', 'G_8'],
  ['2', 'G_8', 'D', 'H_8', 'I_8', 'J_8'],
  ['2', 'I_5', 'E_8', 'K_8', 'L_8', 'M_8'],
  ['2', 'F', 'E', 'N_8', 'O_8', 'P_8'],
  ['2', 'P_8', 'E', 'Q_8', 'R_8', 'S_8'],
  ['2', 'F_8', 'N_8', 'T_8', 'U_8', 'V_8'],
  ['2', 'G', 'F', 'W_8', 'Z_8', 'A_9'],
  ['2', 'A_9', 'F', 'B_9', 'C_9', 'D_9'],
  ['2', 'O_8', 'W_8', 'E_9', 'F_9', 'G_9'],
  ['2', 'H', 'G', 'H_9', 'I_9', 'J_9'],
  ['2', 'J_9', 'G', 'K_9', 'L_9', 'M_9'],
  ['2', 'Z_8', 'H_9', 'N_9', 'O_9', 'P_9'],
  ['2', 'I', 'H', 'Q_9', 'R_9', 'S_9'],
  ['2', 'S_9', 'H', 'T_9', 'U_9', 'V_9'],
  ['2', 'I_9', 'Q_9', 'W_9', 'Z_9', 'A_{10}'],
  ['2', 'J', 'I', 'B_{10}', 'C_{10}', 'D_{10}'],
  ['2', 'D_{10}', 'I', 'E_{10}', 'F_{10}', 'G_{10}'],
  ['2', 'R_9', 'B_{10}', 'H_{10}', 'I_{10}', 'J_{10}'],
  ['2', 'K', 'J', 'K_{10}', 'L_{10}', 'M_{10}'],
  ['2', 'M_{10}', 'J', 'N_{10}', 'O_{10}', 'P_{10}'],
  ['2', 'C_{10}', 'K_{10}', 'Q_{10}', 'R_{10}', 'S_{10}'],
  ['2', 'C_3', 'B_3', 'T_{10}', 'U_{10}', 'V_{10}'],
  ['2', 'V_{10}', 'B_3', 'W_{10}', 'Z_{10}', 'A_{11}'],
  ['2', 'U_7', 'T_{10}', 'B_{11}', 'C_{11}', 'D_{11}'],
  ['2', 'D_3', 'C_3', 'E_{11}', 'F_{11}', 'G_{11}'],
  ['2', 'G_{11}', 'C_3', 'H_{11}', 'I_{11}', 'J_{11}'],
  ['2', 'U_{10}', 'E_{11}', 'K_{11}', 'L_{11}', 'M_{11}'],
];

function transformTemplate(template: MacroTemplate, a: Vec, b: Vec, point: Vec): Vec {
  const sourceX = template.b.x - template.a.x;
  const sourceY = template.b.y - template.a.y;
  const targetX = b.x - a.x;
  const targetY = b.y - a.y;
  const denominator = sourceX * sourceX + sourceY * sourceY;
  const real = (targetX * sourceX + targetY * sourceY) / denominator;
  const imaginary = (targetY * sourceX - targetX * sourceY) / denominator;
  const x = point.x - template.a.x;
  const y = point.y - template.a.y;
  return { x: a.x + real * x - imaginary * y, y: a.y + imaginary * x + real * y };
}

function regularPolygon(a: Vec, b: Vec, sides: number): Vec[] {
  const points = [a, b];
  const turn = (2 * Math.PI) / sides;
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  for (let index = 2; index < sides; index++) {
    const nextDx = dx * Math.cos(turn) - dy * Math.sin(turn);
    const nextDy = dx * Math.sin(turn) + dy * Math.cos(turn);
    const previous = points[points.length - 1]!;
    points.push({ x: previous.x + nextDx, y: previous.y + nextDy });
    dx = nextDx;
    dy = nextDy;
  }
  return points;
}

function applyOperations(
  operations: readonly MacroOp[],
  anchors: Map<string, Vec>,
  tiles: Tile[],
): void {
  for (const [kind, aName, bName, firstName, secondName, thirdName] of operations) {
    const a = anchors.get(aName)!;
    const b = anchors.get(bName)!;
    const template = MACROS[kind];
    const points = template.polygon.map((point) => transformTemplate(template, a, b, point));
    const outputs = template.anchors.map((point) => transformTemplate(template, a, b, point));
    anchors.set(firstName, outputs[0]!);
    anchors.set(secondName, outputs[1]!);
    anchors.set(thirdName, outputs[2]!);
    tiles.push({ kind: kind === '1' ? 0 : 1, points });
  }
}

export const VODERBERG_OUTLINE: readonly Vec[] = MACROS['1'].polygon;

/** A finite, complete double-spiral patch built by the published layer recurrence. */
export function generateVoderberg(_radius: number): Tile[] {
  const anchors = new Map<string, Vec>();
  const seed = regularPolygon(
    { x: -1.5515173445039863, y: 1.3918248114979803 },
    { x: -1.5473510892679578, y: 1.1001869449759967 },
    24,
  );
  const seedNames = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Z',
  ];
  seedNames.forEach((name, index) => {
    anchors.set(name, seed[index]!);
  });

  const tiles: Tile[] = [];
  applyOperations(INNER_LAYER, anchors, tiles);

  const scaffold = regularPolygon(anchors.get('C_1')!, anchors.get('A_1')!, 24);
  const scaffoldNames = [
    'C_1', 'A_1', 'S_2', 'T_2', 'U_2', 'V_2', 'W_2', 'Z_2', 'A_3', 'B_3', 'C_3', 'D_3',
    'E_3', 'F_3', 'G_3', 'H_3', 'I_3', 'J_3', 'K_3', 'L_3', 'M_3', 'N_3', 'O_3', 'P_3',
  ];
  scaffoldNames.forEach((name, index) => anchors.set(name, scaffold[index]!));
  applyOperations(OUTER_LAYERS, anchors, tiles);
  return tiles;
}

export const voderberg: TilingDefinition = {
  id: 'voderberg',
  name: 'Voderberg spiral',
  family: 'nonperiodic',
  description:
    'A finite patch of the classic Voderberg double spiral, grown from congruent nonagons by successive beak-to-butt layers.',
  kinds: 2,
  kindLabels: ['outward placement', 'inward placement'],
  viewportMode: 'fit-patch',
  reference: 'https://doi.org/10.1080/0025570X.2020.1708685',
  unitTileArea: area(VODERBERG_OUTLINE),
  generate: generateVoderberg,
};
