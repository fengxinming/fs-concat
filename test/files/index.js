const PROTOCOL = /^([a-z][a-z\d+\-.]*:)?\/\//i;

export default function (url) {
  return PROTOCOL.test(url);
}
import isFunction from 'celia.is/isFunction';
import isNumber from 'celia.is/isNumber';

export default function (value) {
  return !!value && isNumber(value.length) && !isFunction(value);
};
const toString = Object.prototype.toString;

export default function (value) {
  return toString.call(value) === '[object AsyncFunction]';
}
export default function (value) {
  return typeof value === 'boolean';
};
export default function (value) {
  return value instanceof Date;
};
const FALSY = [false, null, undefined, 0, ''];

export default function (bool) {
  return FALSY.indexOf(bool) !== -1 || !bool;
}
export default function (value) {
  return typeof value === 'function';
};
import _isInteger from 'celia.is/_isInteger';

export default Number.isInteger || _isInteger;
export default function (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
export default function (value) {
  /* eslint eqeqeq: 0 */
  return value == null;
};
export default function (value) {
  return typeof value === 'number';
};
export default function (value) {
  return value !== null && typeof value === 'object';
};
const toString = Object.prototype.toString;

export default function (value) {
  return !!value && toString.call(value) === '[object Object]';
}
import isFunction from 'celia.is/isFunction';

export default function (value) {
  return !!value
    && isFunction(value.then)
    && isFunction(value.catch);
}
export default function (value) {
  return value instanceof RegExp;
};
export default function (value) {
  return typeof value === 'string';
};
export default function (value) {
  return typeof value === 'undefined';
};
import isDate from 'celia.is/isDate';

export default function (date) {
  return isDate(date) && date.toString() !== 'Invalid Date';
};
export default function (elem) {
  return !!elem && elem === elem.window;
}
import isNumber from 'celia.is/isNumber';

export default function (value) {
  return isNumber(value)
    // eslint-disable-next-line no-restricted-globals
    && isFinite(value)
    && (value >> 0) === value;
}
