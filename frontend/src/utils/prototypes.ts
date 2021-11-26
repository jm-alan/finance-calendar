/* eslint-disable no-extend-native */

export type EnumeratedmonthObject = {
  [key: string]: number;
};

console.log('=====================================RUNNING=====================================');

Date.prototype.toEnumeratedMonthObject = function () {
  const origDate = this.getDate();
  const monthObj: EnumeratedmonthObject = {};

  this.setDate(1);
  monthObj[this.toLocaleDateString(undefined, { dateStyle: 'short' })] = this.getDay();
  this.setDate(2);
  while (this.getDate() !== 1) {
    monthObj[this.toLocaleDateString(undefined, { dateStyle: 'short' })] = this.getDay();
    this.setDate(this.getDate() + 1);
  }

  this.setDate(origDate);
  return monthObj;
};
