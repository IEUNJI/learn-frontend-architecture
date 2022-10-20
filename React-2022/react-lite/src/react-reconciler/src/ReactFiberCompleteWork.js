import logger, { indent } from 'shared/logger';
import { HostRoot, HostComponent, HostText } from './ReactWorkTags';
import { createInstance, createTextInstance, appendInitialChild, finalizeInitialChildren } from 'react-dom-bindings/src/client/ReactDOMHostConfig';
import { NoFlags } from './ReactFiberFlags';

/**
 * 把当前 Fiber 所有子节点对应的真实 DOM 都挂载到父节点上
 * @param {*} parent 当前 Fiber 对应的真实 DOM
 * @param {*} workInProgress 当前 Fiber
 */
function appendAllChildren(parent, workInProgress) {
  let node = workInProgress.child;

  while (node) {
    if (node.tag === HostComponent || node.tag === HostText) {
      // 子节点的类型为原生标签或原生文本节点
      appendInitialChild(parent, node.stateNode);
    } else if (node.child !== null) {
      // 子节点的类型不是原生标签和原生文本节点, 可能为函数组件
      node = node.child;
      continue;
    }

    if (node === workInProgress) {
      return;
    }

    // 子节点没有弟弟节点
    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }
      // 回到父节点
      node = node.return;
    }

    node = node.sibling;
  }
}

export function completeWork(current, workInProgress) {
  indent.number -= 2;
  logger(' '.repeat(indent.number) + 'completeWork', workInProgress);

  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case HostRoot:
      bubbleProperties(workInProgress);
      break;
    case HostComponent:
      const type = workInProgress.type;
      const instance = createInstance(type, newProps, workInProgress);
      appendAllChildren(instance, workInProgress);
      workInProgress.stateNode = instance;
      finalizeInitialChildren(instance, type, newProps);
      bubbleProperties(workInProgress);
      break;
    case HostText:
      const newText = newProps;
      workInProgress.stateNode = createTextInstance(newText);
      bubbleProperties(workInProgress);
      break;
  }
}

function bubbleProperties(completedWork) {
  let subtreeFlags = NoFlags;
  let child = completedWork.child;

  while (child !== null) {
    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flags;
    child = child.sibling;
  }

  completedWork.subtreeFlags = subtreeFlags;
}
