function sleep(duration) {
  const t = Date.now();

  while (Date.now() - t < duration) {

  }
}

const works = [
  () => {
    console.log('任务一开始');
    sleep(20);
    console.log('任务一结束');
  },
  () => {
    console.log('任务二开始');
    sleep(20);
    console.log('任务二结束');
  },
  () => {
    console.log('任务三开始');
    sleep(20);
    console.log('任务三结束');
  }
];

function performUnitOfWork() {
  const work = works.shift();
  work();
}

function workLoop(deadline) {
  console.log(`当前帧空闲时间剩余${deadline.timeRemaining()}ms`);

  while (deadline.timeRemaining() > 0 && works.length > 0) {
    performUnitOfWork();
  }

  if (works.length > 0) {
    console.log(`当前帧空闲时间只剩余${deadline.timeRemaining()}ms, 等待下一帧`);
    requestIdleCallback(workLoop);
  }
}

requestIdleCallback(workLoop);
