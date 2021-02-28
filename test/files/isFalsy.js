const FALSY = [false, null, undefined, 0, ''];

export default function (bool) {
  return FALSY.indexOf(bool) !== -1 || !bool;
}
