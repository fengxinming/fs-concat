import isDate from 'celia.is/isDate';

export default function (date) {
  return isDate(date) && date.toString() !== 'Invalid Date';
};
