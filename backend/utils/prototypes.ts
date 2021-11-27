interface String {
  /**
   * Returns a new string with the first letter capitalized.
   */
  upperCaseFirst (): string;
  /**
   * Returns a new string resulting from repeatedly removing the
   * last character of the original string until the resultant
   * string matches the input pattern.
   * If the pattern is never matched, returns an empty string.
   * @param pattern: the pattern which the input string must match.
   */
  truncateUntil (pattern: RegExp): string;
};

interface Array<T extends object> {
  /**
   * Returns a new object with each item of the original array
   * mapped to the value found at `selector`
   * @param key: string
   */
  toKeyedObject (selector: string): {
    [key: number | string]: T;
  };
  /**
   * Takes in an asynchronous callback, and returns a promise,
   * allowing asynchronous actions to be performed on every member
   * of the array. Guarantees that each call to `callback` will be
   * complete before the next begins.
   * @param callback: the asynchronous function to execute on each member of the array
   */
  asyncForEach (callback: (element?: any, index?: number, selfRef?: Array<T>) => Promise<void>): Promise<void>;
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

Array.prototype.toKeyedObject = function (selector: string) {
  return this.reduce(
    (
      acc: {
        [key: number | string]: any;
      },
      next: {
        [key: string]: number | string;
      }
    ) => {
      acc[next[selector]] = next;
      return acc;
    }, {});
};

Array.prototype.asyncForEach = async function (cb) {
  for (let i = 0; i < this.length; i++) await cb(this[i], i, this);
};
