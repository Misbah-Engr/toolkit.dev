import { format, addDays, areIntervalsOverlapping } from "date-fns";

/**
 * Gets today's date in YYYY-MM-DD format
 * @returns Today's date as a string
 */
export const getTodayDate = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};

/**
 * Adds days to a date and returns it in YYYY-MM-DD format
 * @param date - Base date string in YYYY-MM-DD format
 * @param days - Number of days to add
 * @returns New date as a string
 */
export const addDaysToDate = (date: string, days: number): string => {
  const dateObj = new Date(date);
  return format(addDays(dateObj, days), "yyyy-MM-dd");
};

/**
 * Applies intelligent defaults for date ranges following the || pattern from other toolkits
 * @param startDate - Optional start date
 * @param endDate - Optional end date
 * @returns Object with searchStartDate and searchEndDate
 */
export const applyDateDefaults = (startDate?: string, endDate?: string) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const searchStartDate = startDate ?? today;

  // If no end date, just add 7 days to the start date
  const searchEndDate =
    endDate ?? format(addDays(new Date(searchStartDate), 7), "yyyy-MM-dd");

  return {
    searchStartDate,
    searchEndDate,
  };
};

/**
 * Checks if two date ranges overlap
 * @param start1 - Start of first range
 * @param end1 - End of first range
 * @param start2 - Start of second range
 * @param end2 - End of second range
 * @returns True if ranges overlap
 */
export const doRangesOverlap = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date,
): boolean => {
  return areIntervalsOverlapping(
    { start: start1, end: end1 },
    { start: start2, end: end2 },
  );
};

/**
 * Converts minutes to milliseconds
 * @param minutes - Number of minutes
 * @returns Milliseconds
 */
export const minutesToMs = (minutes: number): number => {
  return minutes * 60 * 1000;
};

/**
 * Converts milliseconds to minutes
 * @param ms - Milliseconds
 * @returns Minutes
 */
export const msToMinutes = (ms: number): number => {
  return Math.floor(ms / (60 * 1000));
};
