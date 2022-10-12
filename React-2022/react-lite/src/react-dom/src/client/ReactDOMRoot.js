import { createContainer, updateContainer } from 'react-reconciler/src/ReactFiberReconciler.js';

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}
ReactDOMRoot.prototype.render = function render(children) {
  const root = this._internalRoot;

  updateContainer(children, root);
};

export function createRoot(container) {
  const root = createContainer(container);

  return new ReactDOMRoot(root);
}
