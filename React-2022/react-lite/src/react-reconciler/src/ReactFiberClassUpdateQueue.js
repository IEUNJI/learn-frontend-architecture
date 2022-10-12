export function initialUpdateQueue(fiber) {
  const queue = {
    shared: {
      pending: null // 循环链表
    }
  };

  fiber.updateQueue = queue;
}

export function createUpdate() {
  const update = {};

  return update;
}

export function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  const pending = updateQueue.shared.pending;

  // pending 为最后一个更新，最后一个更新的 next 指向第一个更新
  if (pending === null) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  updateQueue.shared.pending = update;
}
