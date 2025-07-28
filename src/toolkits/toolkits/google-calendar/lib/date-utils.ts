/**
 * Gets today's date in YYYY-MM-DD format
 * @returns Today's date as a string
 */
export const getTodayDate = (): string => {
  const dateString = new Date().toISOString().split('T')[0];
  if (!dateString) {
    throw new Error('Failed to get today\'s date');
  }
  return dateString;
};

/**
 * Adds days to a date and returns it in YYYY-MM-DD format
 * @param date - Base date string in YYYY-MM-DD format
 * @param days - Number of days to add
 * @returns New date as a string
 */
export const addDaysToDate = (date: string, days: number): string => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  const dateString = dateObj.toISOString().split('T')[0];
  if (!dateString) {
    throw new Error('Failed to add days to date');
  }
  return dateString;
};

/**
 * Applies intelligent defaults for date ranges following the || pattern from other toolkits
 * @param startDate - Optional start date
 * @param endDate - Optional end date
 * @returns Object with searchStartDate and searchEndDate
 */
export const applyDateDefaults = (startDate?: string, endDate?: string) => {
  const today = getTodayDate();
  const searchStartDate = startDate ?? today;
  const searchEndDate = endDate ?? addDaysToDate(searchStartDate, 7);
  
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
  end2: Date
): boolean => {
  return start1 < end2 && end1 > start2;
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