/* eslint-disable no-extend-native */

String.prototype.upperCaseFirst = function () {
  return `${this[0].toUpperCase()}${this.slice(1)}`;
};

String.prototype.truncateUntil = function (pattern) {
  const validateAbsoluteStart = pattern.toString();
  if (!(validateAbsoluteStart[1] === '^')) {
    pattern = new RegExp(
      `^${validateAbsoluteStart.slice(1, validateAbsoluteStart.length - 1)}`
    );
  }
  const validateAbsoluteEnd = pattern.toString();
  if (!(validateAbsoluteEnd[validateAbsoluteEnd.length - 2] === '$')) {
    pattern = new RegExp(
      `${validateAbsoluteEnd.slice(1, validateAbsoluteEnd.length - 1)}$`
    );
  }
  let out = this.toString();
  while (!out.match(pattern) && out.length) out = out.slice(0, out.length - 1);
  return out;
};

Array.prototype.toKeyedObject = function (key) {
  return this.reduce((acc, next) => (acc[next[key]] = next) && acc, {});
};
