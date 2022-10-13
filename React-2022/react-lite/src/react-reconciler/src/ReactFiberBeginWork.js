import logger from 'shared/logger';
import { HostRoot, HostComponent, HostText } from './ReactWorkTags';

function updateHostRoot(current, workInProgress) {
  processUpdateQueue(workInProgress); // workInProgress.memoizedState = { element };
  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;
  // DOM-DIFF 算法
  reconcileChildren(current, workInProgress, nextChildren);

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
  logger('beginWork', workInProgress);
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
