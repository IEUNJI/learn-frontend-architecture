import logger, { indent } from 'shared/logger';

export function completeWork(current, completedWork) {
  indent.number -= 2;
  logger(' '.repeat(indent.number) + 'completeWork', completedWork);
}
