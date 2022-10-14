import { markUpdateLaneFromFiberToRoot } from './ReactFiberConcurrentUpdates';
import assign from 'shared/assign';

export const UpdateState = 0;

export function initialUpdateQueue(fiber) {
  const queue = {
    shared: {
      pending: null // 循环链表
    }
  };

  fiber.updateQueue = queue;
}

export function createUpdate() {
  const update = {
    tag: UpdateState
  };

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

  return markUpdateLaneFromFiberToRoot(fiber);
}

/**
 * 根据老状态和更新队列计算新状态
 * @param {*} workInProgress Fiber
 */
export function processUpdateQueue(workInProgress) {
  const queue = workInProgress.updateQueue;
  const pendingQueue = queue.shared.pending;

  if (pendingQueue !== null) {
    queue.shared.pending = null; // 清空队列
    const lastPendingUpdate = pendingQueue;
    const firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null; // 把环状链表断开

    let newState = workInProgress.memoizedState;
    let update = firstPendingUpdate;

    while (update) {
      newState = getStateFromUpdate(update, newState);
      update = update.next;
    }

    workInProgress.memoizedState = newState;
  }
}

function getStateFromUpdate(update, prevState) {
  switch (update.tag) {
    case UpdateState:
      const { payload } = update;
      return assign({}, prevState, payload);
  }
}
