import logger, { indent } from 'shared/logger';
import { HostRoot, HostComponent, HostText } from './ReactWorkTags';
import { processUpdateQueue } from './ReactFiberClassUpdateQueue';
import { mountChildFibers, reconcileChildFibers } from './ReactChildFiber';
import { shouldSetTextContent } from 'react-dom-bindings/src/ReactDOMHostConfig';

/**
 * 根据新的虚拟 DOM 生成新的 Fiber 链表
 * @param {*} current 老 Fiber
 * @param {*} workInProgress 新 Fiber
 * @param {*} nextChildren 新的子虚拟 DOM
 */
function reconcileChildren(current, workInProgress, nextChildren) {
  if (current === null) {
    // 没有老 Fiber
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
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
  const { type } = workInProgress;
  const nextProps = workInProgress.pendingProps;
  let nextChildren = nextProps.children;

  // 判断当前的虚拟 DOM 是不是只有一个文本类型的子节点
  const isDirectTextChild = shouldSetTextContent(type, nextProps);
  if (isDirectTextChild) {
    nextChildren = null;
  }

  reconcileChildren(current, workInProgress, nextChildren); // 虚拟 DOM -> Fiber

  return workInProgress.child;
}

/**
 * 根据新的虚拟 DOM 构建新的 Fiber 子链表
 * @param {*} current 老 Fiber
 * @param {*} workInProgress 新 Fiber
 * @returns 
 */
export function beginWork(current, workInProgress) {
  logger(' '.repeat(indent.number) + 'beginWork', workInProgress);
  indent.number += 2;
  
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
