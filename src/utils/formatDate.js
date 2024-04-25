const defaultDateOptions = {
  // weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

/**
 *
 * @param {Date | number | string} inputDate - The date to format. It can be a Date object, a timestamp (number), or a date string.
 * @param {Intl.DateTimeFormatOptions} [dateOptions=defaultDateOptions] - The options to use when formatting the date. Default is set to defaultDateOptions.
 * @returns {string} A string representing the formatted date
 */
export default function formatDate(
  inputDate,
  dateOptions = defaultDateOptions,
) {
  const date = new Date(inputDate);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Adjust to local time zone
  return date.toLocaleDateString('en-US', dateOptions);
}
