import { createContainer } from 'react-reconciler/src/ReactFiberReconciler.js';

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

export function createRoot(container) {
  const root = createContainer(container);

  return new ReactDOMRoot(root);
}
