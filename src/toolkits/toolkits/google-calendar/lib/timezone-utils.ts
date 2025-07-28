import type { calendar_v3 } from "googleapis";

const DEFAULT_TIMEZONE = 'America/New_York';

/**
 * Gets the user's primary calendar timezone
 * @param calendar - The Google Calendar client
 * @returns The user's timezone or a fallback timezone
 */
export const getUserTimezone = async (calendar: calendar_v3.Calendar): Promise<string> => {
  try {
    const calendarResponse = await calendar.calendars.get({
      calendarId: 'primary'
    });
    return calendarResponse.data.timeZone || DEFAULT_TIMEZONE;
  } catch (error) {
    // Using fallback timezone
    return DEFAULT_TIMEZONE;
  }
};

/**
 * Creates RFC3339 timestamps for a date range
 * @param startDate - Start date in YYYY-MM-DD format
 * @param endDate - End date in YYYY-MM-DD format
 * @returns Object with timeMin and timeMax RFC3339 timestamps
 */
export const createTimeRange = (startDate: string, endDate: string) => {
  const startOfDay = new Date(`${startDate}T00:00:00`);
  const endOfDay = new Date(`${endDate}T23:59:59`);
  
  return {
    timeMin: startOfDay.toISOString(),
    timeMax: endOfDay.toISOString(),
  };
};

/**
 * Formats a date for display in a specific timezone
 * @param date - Date to format
 * @param timezone - Timezone to use for formatting
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDateInTimezone = (
  date: Date | string,
  timezone: string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', { timeZone: timezone, ...options });
};

/**
 * Formats a time for display in a specific timezone
 * @param date - Date to format
 * @param timezone - Timezone to use for formatting
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted time string
 */
export const formatTimeInTimezone = (
  date: Date | string,
  timezone: string,
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-US', { 
    timeZone: timezone,
    hour12: true,
    ...options 
  });
}; 