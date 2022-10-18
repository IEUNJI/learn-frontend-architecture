import { HostRoot, IndeterminateComponent, HostComponent, HostText } from './ReactWorkTags';
import { NoFlags } from './ReactFiberFlags';

function FiberNode(tag, pendingProps, key) {
  this.tag = tag; // Fiber 的类型
  this.key = key; // 唯一标识
  this.type = null; // 虚拟 DOM 的 type
  this.stateNode = null; // 真实 DOM 节点

  this.return = null; // 父节点
  this.child = null; // 第一个子节点
  this.sibling = null; // 弟弟节点
  this.index = 0;

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

/**
 * 基于旧 Fiber 和新属性创建新 Fiber
 */
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;

  if (workInProgress === null) {
    workInProgress = createFiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;
    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
  }

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;

  return workInProgress;
}

/**
 * 根据虚拟 DOM 创建 Fiber 节点
 * @param {*} element 虚拟 DOM
 */
export function createFiberFromElement(element) {
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;

  return createFiberFromTypeAndProps(type, key, pendingProps);
}

function createFiberFromTypeAndProps(type, key, pendingProps) {
  let tag = IndeterminateComponent;
  if (typeof type === 'string') {
    tag = HostComponent;
  }

  const fiber = createFiber(tag, pendingProps, key);
  fiber.type = type;

  return fiber;
}

export function createFiberFromText(content) {
  const fiber = createFiber(HostText, content, null);

  return fiber;
}
