import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import hasOwnProperty from 'shared/hasOwnProperty';

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

function hasValidKey(config) {
  return config.key !== undefined;
}

function hasValidRef(config) {
  return config.ref !== undefined;
}

function ReactElement(type, key, ref, props) {

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props
  };
}

export function jsxDEV(type, config) {
  let propName;
  const props = {};
  let key = null;
  let ref = null;

  if (hasValidKey(config)) {
    key = config.key;
  }

  if (hasValidRef(config)) {
    ref = config.ref;
  }

  for (propName in config) {
    if (hasOwnProperty.call(config, propName) && !hasOwnProperty.call(RESERVED_PROPS, propName)) {
      props[propName] = config[propName];
    }
  }

  return ReactElement(type, key, ref, props);
}
