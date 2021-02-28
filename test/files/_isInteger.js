import isNumber from 'celia.is/isNumber';

export default function (value) {
  return isNumber(value)
    // eslint-disable-next-line no-restricted-globals
    && isFinite(value)
    && (value >> 0) === value;
}
