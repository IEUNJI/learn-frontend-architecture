function initialUpdateQueue(fiber) {
  const queue = {
    shared: {
      pending: null
    }
  };

  fiber.updateQueue = queue;
}

function createUpdate() {
  return {};
}

function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  const shared = updateQueue.shared;
  const pending = shared.pending;

  // pending 为最后一个更新，最后一个更新的 next 指向第一个更新
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  updateQueue.shared.pending = update;
}

function getStateFromUpdate(update, newState) {
  return Object.assign({}, newState, update.payload);
}

function processUpdateQueue(fiber) {
  const queue = fiber.updateQueue;
  const pending = queue.shared.pending;

  if (pending !== null) {
    queue.shared.pending = null; // 清空

    const lastPendingUpdate = pending;
    const firstPendingUpdate = lastPendingUpdate.next;
    // 把环状链表断开
    lastPendingUpdate.next = null;

    let newState = fiber.memoizedState;
    let update = firstPendingUpdate;
    while (update) {
      newState = getStateFromUpdate(update, newState);
      update = update.next;
    }

    fiber.memoizedState = newState;
  }
}

const fiber = { memoizedState: { id: 1 } };
initialUpdateQueue(fiber);

const update1 = createUpdate();
update1.payload = { name: 'ieunji-1' };
enqueueUpdate(fiber, update1);

const update2 = createUpdate();
update2.payload = { name: 'ieunji-2' };
enqueueUpdate(fiber, update2);

const update3 = createUpdate();
update3.payload = { name: 'ieunji-3' };
enqueueUpdate(fiber, update3);

const update4 = createUpdate();
update4.payload = { name: 'ieunji-4' };
enqueueUpdate(fiber, update4);

processUpdateQueue(fiber);
console.log(fiber.memoizedState);
