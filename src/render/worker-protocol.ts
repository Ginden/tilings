import type { RenderOptions, RenderResult } from './svg.js';

export interface RenderRequest {
  readonly id: number;
  readonly tilingId: string;
  readonly options: RenderOptions;
}

export type RenderResponse =
  | {
      readonly id: number;
      readonly result: RenderResult;
    }
  | {
      readonly error: string;
      readonly id: number;
    };
