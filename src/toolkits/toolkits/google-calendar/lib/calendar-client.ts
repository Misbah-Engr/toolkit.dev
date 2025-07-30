import { google } from "googleapis";
import type { calendar_v3 } from "googleapis";

/**
 * Creates a Google Calendar client with the provided access token
 * @param accessToken - The Google OAuth access token
 * @returns A configured Google Calendar client
 */
export const createCalendarClient = (
  accessToken: string,
): calendar_v3.Calendar => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return google.calendar({ version: "v3", auth });
};
