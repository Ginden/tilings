/// <reference lib="webworker" />

import { runRenderJob } from './worker-job.js';
import type { RenderRequest } from './worker-protocol.js';

const scope = globalThis as unknown as DedicatedWorkerGlobalScope;

scope.addEventListener('message', (event: MessageEvent<RenderRequest>) => {
  scope.postMessage(runRenderJob(event.data));
});
