const PROTOCOL = /^([a-z][a-z\d+\-.]*:)?\/\//i;

export default function (url) {
  return PROTOCOL.test(url);
}
