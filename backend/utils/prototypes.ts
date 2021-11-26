interface String {
  upperCaseFirst: () => string;
  truncateUntil: (pattern: RegExp) => string;
};

interface Array<T> {
  toKeyedObject: (key: string) => object;
  asyncForEach: (callback: (element?: any, index?: number, selfRef?: any[]) => Promise<void>) => Promise<void>;
};

String.prototype.upperCaseFirst = function () {
  return `${this[0].toUpperCase()}${this.slice(1)}`;
};

String.prototype.truncateUntil = function (pattern: RegExp) {
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

Array.prototype.toKeyedObject = function (key: string) {
  return this.reduce(
    (
      acc: {
        [key: number]: any
      },
      next: {
        [key: string]: number
      }
    ) => {
      acc[next[key]] = next;
      return acc;
    }, {});
};

Array.prototype.asyncForEach = async function (cb) {
  for (let i = 0; i < this.length; i++) await cb(this[i], i, this);
}
