import { HostRoot } from './ReactWorkTags';
import { NoFlags } from './ReactFiberFlags';

/**
 * 
 * @param {*} tag Fiber 的类型
 * @param {*} pendingProps 等待生效的属性
 * @param {*} key 唯一标识
 */
function FiberNode(tag, pendingProps, key) {
  this.tag = tag;
  this.key = key;
  this.type = null; // 虚拟 DOM 的 type
  this.stateNode = null; // 真实 DOM 节点
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.pendingProps = pendingProps;
  this.memoizedProps = null; // 已经生效的属性
  this.memoizedState = null;
  this.updateQueue = null;
  this.flags = NoFlags; // 副作用标识, 表示要针对此 Fiber 节点进行某种操作
  this.subtreeFlags = NoFlags; // 性能优化
  this.alternate = null; // 双缓冲技术
}

export function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key);
}

export function createHostRootFiber() {
  return createFiber(HostRoot, null, null);
}
