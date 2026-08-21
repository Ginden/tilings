import { StrictMode } from 'react';
import type { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

type ReactComponent = (props: Record<string, unknown>) => ReactElement;
type IslandRenderer = (props: Record<string, unknown>) => void;

function getRoot(id: string): HTMLElement {
  const found = document.getElementById(id);
  if (!found) throw new Error(`Missing element #${id}`);
  return found;
}

export function createReactIsland(
  id: string,
  component: ReactComponent,
): IslandRenderer {
  const container = getRoot(id);
  const root = createRoot(container);

  return (props) => {
    root.render(
      <StrictMode>
        {component(props)}
      </StrictMode>,
    );
  };
}
