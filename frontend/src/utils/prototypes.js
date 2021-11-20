/* eslint-disable no-extend-native */

Date.prototype.toEnumeratedMonthObject = function () {
  const origDate = this.getDate();
  const monthObj = {};

  this.setDate(1);
  monthObj[this.toLocaleDateString({}, { dateStyle: 'short' })] = this.getDay();
  this.setDate(2);
  while (this.getDate() !== 1) {
    monthObj[this.toLocaleDateString({}, { dateStyle: 'short' })] = this.getDay();
    this.setDate(this.getDate() + 1);
  }

  this.setDate(origDate);
  return monthObj;
};
