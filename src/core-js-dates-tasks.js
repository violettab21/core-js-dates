/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return new Date(date) - new Date('01 Jan 1970 00:00:00 UTC');
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const day = new Date(date).getDay();
  let dayName = '';
  switch (day) {
    case 0:
      dayName = 'Sunday';
      break;
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    case 6:
      dayName = 'Saturday';
      break;
    default:
      dayName = '';
  }
  return dayName;
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const day = date.getDay();
  const diff = 5 - day;
  let resultDate = 0;
  if (diff > 0) {
    resultDate = date.getTime() + diff * millisecondsPerDay;
  } else {
    resultDate = date.getTime() + (7 - Math.abs(diff)) * millisecondsPerDay;
  }
  return new Date(resultDate);
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const date1 = new Date(year, month - 1, 1);
  const date2 = new Date(year, month, 1);
  const diff = date2 - date1;
  const days = diff / 1000 / 3600 / 24;
  return days;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const diff = new Date(dateEnd) - new Date(dateStart);
  const days = diff / 1000 / 3600 / 24;
  return days + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const timeEnd = new Date(period.end).getTime();
  const timeStart = new Date(period.start).getTime();
  const givenDate = new Date(date);
  return givenDate >= timeStart && givenDate <= timeEnd;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const givenDate = new Date(date);
  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  };
  return new Intl.DateTimeFormat('default', options).format(givenDate);
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const date1 = new Date(year, month - 1, 1);
  const date2 = new Date(year, month, 1);
  const diff = date2 - date1;
  const daysInMonth = diff / 1000 / 3600 / 24;
  let weekends = 0;
  const fullWeeks = Math.floor(daysInMonth / 7);
  weekends = fullWeeks * 2;
  const restDays = daysInMonth % 7;
  if (restDays !== 0) {
    const lastDay = new Date(year, month - 1, daysInMonth);
    const weekdayOfLastDayMonth = lastDay.getDay();
    const listOfDays = [];

    for (let i = 0; i < restDays; i += 1) {
      if (weekdayOfLastDayMonth - i >= 0) {
        listOfDays.push(weekdayOfLastDayMonth - i);
      } else listOfDays.push(7 + (weekdayOfLastDayMonth - i));
    }

    weekends += listOfDays.filter((el) => el === 0 || el === 6).length;
  }
  return weekends;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const year = new Date(date).getFullYear();
  let firstDayOfYear;
  firstDayOfYear = new Date(year, 0, 1);
  if (firstDayOfYear.getDay() < 1 || firstDayOfYear.getDay() > 4) {
    for (let i = 1; i <= 7; i += 1) {
      firstDayOfYear = new Date(year, 0, i + 1);
      if (firstDayOfYear.getDay() === 1) break;
    }
  }

  const givenDate = date.getTime();
  const diff = givenDate - firstDayOfYear.getTime();

  if (diff <= 0) return 1;
  const weeks = Math.ceil((diff / 1000 / 3600 / 24 + 1) / 7);
  return weeks;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const day = date.getDay();
  const diff = 5 - day;
  let resultDate = 0;
  if (diff > 0) {
    resultDate = date.getTime() + diff * millisecondsPerDay;
  } else {
    resultDate = date.getTime() + (7 - Math.abs(diff)) * millisecondsPerDay;
  }
  if (new Date(resultDate).getDate() === 13) return new Date(resultDate);
  return getNextFridayThe13th(new Date(resultDate));
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = date.getMonth();
  let quarter = 0;
  if (month >= 0 && month <= 2) {
    quarter = 1;
  }
  if (month >= 3 && month <= 5) {
    quarter = 2;
  }
  if (month >= 6 && month <= 8) {
    quarter = 3;
  }
  if (month >= 9 && month <= 11) {
    quarter = 4;
  }
  return quarter;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const startDateComponents = period.start.split('-');
  const startDate = new Date(
    startDateComponents[2],
    startDateComponents[1] - 1,
    startDateComponents[0]
  );
  const endDateComponents = period.end.split('-');
  const endDate = new Date(
    endDateComponents[2],
    endDateComponents[1] - 1,
    endDateComponents[0]
  );

  const oneDay = 1000 * 60 * 60 * 24;

  const listOfDates = [];
  let day = startDate;
  while (day.getTime() <= endDate.getTime()) {
    listOfDates.push(day);
    day = new Date(day.getTime() + oneDay);
  }

  const arrayOfSchedule = [];

  for (let i = 0; i < countWorkDays; i += 1) {
    arrayOfSchedule.push(1);
  }
  for (let i = 0; i < countOffDays; i += 1) {
    arrayOfSchedule.push(0);
  }
  return listOfDates
    .filter((date, index) => {
      if (index < arrayOfSchedule.length) {
        if (arrayOfSchedule[index] === 0) return false;
      } else if (index >= arrayOfSchedule.length) {
        if (arrayOfSchedule[index % arrayOfSchedule.length] === 0) return false;
      }
      return true;
    })
    .map((date) => {
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    });
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return true;
  }

  return false;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
