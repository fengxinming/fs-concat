import isFunction from 'celia.is/isFunction';
import isNumber from 'celia.is/isNumber';

export default function (value) {
  return !!value && isNumber(value.length) && !isFunction(value);
};
