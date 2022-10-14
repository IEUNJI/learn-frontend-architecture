import logger from 'shared/logger';
import { HostRoot, HostComponent, HostText } from './ReactWorkTags';
import { processUpdateQueue } from './ReactFiberClassUpdateQueue';
import { mountChildFibers, reconcileChildFibers } from './ReactChildFiber';

/**
 * 根据新的虚拟 DOM 生成新的 Fiber 链表
 * @param {*} current 老 Fiber
 * @param {*} workInProgress 新 Fiber
 * @param {*} nextChildren 新的子虚拟 DOM
 */
function reconcileChildren(current, workInProgress, nextChildren) {
  if (current === null) {
    // 没有老 Fiber
    workInProgress.child = mountChildFibers(workInProgress, nextChildren);
  } else {
    // 老的子 Fiber 与新的子虚拟 DOM 进行 DOM-DIFF
    workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren);
  }
}

function updateHostRoot(current, workInProgress) {
  processUpdateQueue(workInProgress);
  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;
  reconcileChildren(current, workInProgress, nextChildren); // 虚拟 DOM -> Fiber

  return workInProgress.child;
}

function updateHostComponent(current, workInProgress) {

  return null;
}

/**
 * 根据新的虚拟 DOM 构建新的 Fiber 子链表
 * @param {*} current 老 Fiber
 * @param {*} workInProgress 新 Fiber
 * @returns 
 */
export function beginWork(current, workInProgress) {
  switch (workInProgress.tag) {
    case HostRoot:
      return updateHostRoot(current, workInProgress);
    case HostComponent:
      return updateHostComponent(current, workInProgress);
    case HostText:
      return null;
    default:
      return null;
  }
}
