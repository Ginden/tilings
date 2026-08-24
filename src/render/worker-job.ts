import { tilingById } from '../tilings/index.js';
import { renderSvg } from './svg.js';
import type { RenderRequest, RenderResponse } from './worker-protocol.js';

export function runRenderJob(request: RenderRequest): RenderResponse {
  try {
    return {
      id: request.id,
      result: renderSvg(tilingById(request.tilingId), request.options),
    };
  } catch (error) {
    return { error: String(error), id: request.id };
  }
}
