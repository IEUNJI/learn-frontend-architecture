import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { createFiberFromElement } from './ReactFiber';
import { Placement } from './ReactFiberFlags';

/**
 * 工厂函数
 * @param {*} shouldTrackSideEffects 是否跟踪副作用
 */
function createChildReconciler(shouldTrackSideEffects) {
  function reconcileSingleElement(returnFiber, currentFirstFiber, element) {
    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }

  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects) {
      // 提交阶段插入此节点 (渲染阶段: 创建 Fiber 树, 提交阶段: 操作真实 DOM)
      newFiber.flags |= Placement;
    }
    return newFiber;
  }

  /**
   * 比较子 Fibers
   * @param {*} returnFiber 新的父 Fiber
   * @param {*} currentFirstFiber 老的 Fiber 的第一个子 Fiber
   * @param {*} newChild 新的子虚拟 DOM
   */
  function reconcileChildFibers(returnFiber, currentFirstFiber, newChild) {
    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstFiber, newChild));
        default:
          break;
      }
    }
  }

  return reconcileChildFibers;
}

export const reconcileChildFibers = createChildReconciler(true);

export const mountChildFibers = createChildReconciler(false);
