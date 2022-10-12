export function initialUpdateQueue(fiber) {
  const queue = {
    shared: {
      pending: null // 循环链表
    }
  };

  fiber.updateQueue = queue;
}
