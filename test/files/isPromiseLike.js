import isFunction from 'celia.is/isFunction';

export default function (value) {
  return !!value
    && isFunction(value.then)
    && isFunction(value.catch);
}
