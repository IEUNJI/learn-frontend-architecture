import { scheduleCallback } from 'scheduler';
import { createWorkInProgress } from './ReactFiber';
import { beginWork } from './ReactFiberBeginWork';

let workInProgress = null; // 进行中的工作

/**
 * 在 Fiber 上调度更新
 */
export function scheduleUpdateOnFiber(root) {
  // 确保调度执行 root 上的更新
  ensureRootIsScheduled(root);
}

function ensureRootIsScheduled(root) {
  // 按计划执行回调, 执行 root 上的并发更新工作
  scheduleCallback(performConcurrentWorkOnRoot.bind(null, root));
}

// 根据虚拟 DOM 构建 Fiber 树, 生成真实 DOM, 再插入到容器中
function performConcurrentWorkOnRoot(root) {
  // 以同步的方式渲染根节点, 初次渲染为同步
  renderRootSync(root);
}

function renderRootSync(root) {
  // 开始构建 Fiber 树
  prepareFreshStack(root);
  workloopSync();
}

function prepareFreshStack(root) {
  workInProgress = createWorkInProgress(root.current, null);
}

function workloopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork) {
  // 老 Fiber
  const current = unitOfWork.alternate;
  const next = beginWork(current, unitOfWork);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    workInProgress = null;
    // completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}
