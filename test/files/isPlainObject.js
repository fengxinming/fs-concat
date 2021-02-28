const toString = Object.prototype.toString;

export default function (value) {
  return !!value && toString.call(value) === '[object Object]';
}
