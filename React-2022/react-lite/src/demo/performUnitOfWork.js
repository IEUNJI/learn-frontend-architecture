const A1 = { type: 'div', key: 'A1' };
const B1 = { type: 'div', key: 'B1', return: A1 };
const B2 = { type: 'div', key: 'B2', return: A1 };
const C1 = { type: 'div', key: 'C1', return: B1 };
const C2 = { type: 'div', key: 'C2', return: B1 };

A1.child = B1;
B1.sibling = B2;
B1.child = C1;
C1.sibling = C2;

const rootFiber = A1;
let nextUnitOfWork = null;

function workLoop() {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
}

function performUnitOfWork(fiber) {
  beginWork(fiber);

  if (fiber.child) {
    return fiber.child;
  }

  while (fiber) {
    completeUnitOfWork(fiber);

    if (fiber.sibling) {
      return fiber.sibling;
    }

    fiber = fiber.return;
  }
}

function beginWork(fiber) {
  console.log('beginWork', fiber.key);
}

function completeUnitOfWork(fiber) {
  console.log('completeUnitOfWork', fiber.key);
}

nextUnitOfWork = rootFiber;
workLoop();
