import * as ReactWorkTags from 'react-reconciler/src/ReactWorkTags';

const ReactWorkTagsMap = Object.keys(ReactWorkTags).reduce((acc, key) => {
  acc[ReactWorkTags[key]] = key;
  return acc;
}, {});

export default function (prefix, workInProgress) {
  const tag = workInProgress.tag;
  const tagName = ReactWorkTagsMap[tag];

  let str = `${prefix} ${tagName}`;

  if (tagName === 'HostComponent') {
    str += ` ${workInProgress.type}`;
  } else if (tagName === 'HostText') {
    str += ` ${workInProgress.pendingProps}`;
  }

  console.log(str);
};

const indent = { number: 0 };

export {
  indent
};
