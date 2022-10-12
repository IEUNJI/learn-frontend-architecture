import { HostRoot } from './ReactWorkTags';
import { NoFlags } from './ReactFiberFlags';

function FiberNode(tag, pendingProps, key) {
  this.tag = tag; // Fiber 的类型
  this.key = key; // 唯一标识
  this.type = null; // 虚拟 DOM 的 type
  this.stateNode = null; // 真实 DOM 节点

  this.return = null; // 父节点
  this.child = null; // 第一个子节点
  this.sibling = null; // 弟弟节点

  this.pendingProps = pendingProps; // 等待生效的属性
  this.memoizedProps = null; // 已经生效的属性

  this.memoizedState = null; // 状态
  this.updateQueue = null; // 更新队列
  this.flags = NoFlags; // 副作用标识, 表示要针对此 Fiber 节点进行某种操作
  this.subtreeFlags = NoFlags; // 子节点的副作用标识, 性能优化
  this.alternate = null; // 替身, 双缓冲技术
}

export function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key);
}

export function createHostRootFiber() {
  return createFiber(HostRoot, null, null);
}
