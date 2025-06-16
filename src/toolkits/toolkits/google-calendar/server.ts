import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseGoogleCalendarToolkitConfig } from "./base";
import {
  googleCalendarListCalendarsToolConfigServer,
  googleCalendarGetCalendarToolConfigServer,
  googleCalendarListEventsToolConfigServer,
  googleCalendarGetEventToolConfigServer,
  googleCalendarSearchEventsToolConfigServer,
} from "./tools/server";
import { GoogleCalendarTools } from "./tools";
import { api } from "@/trpc/server";

export const googleCalendarToolkitServer = createServerToolkit(
  baseGoogleCalendarToolkitConfig,
  async () => {
    const account = await api.accounts.getAccountByProvider("google");

    if (!account?.access_token) {
      throw new Error("No Google account found or access token missing");
    }

    return {
      [GoogleCalendarTools.ListCalendars]:
        googleCalendarListCalendarsToolConfigServer(account.access_token),
      [GoogleCalendarTools.GetCalendar]:
        googleCalendarGetCalendarToolConfigServer(account.access_token),
      [GoogleCalendarTools.ListEvents]:
        googleCalendarListEventsToolConfigServer(account.access_token),
      [GoogleCalendarTools.GetEvent]: googleCalendarGetEventToolConfigServer(
        account.access_token,
      ),
      [GoogleCalendarTools.SearchEvents]:
        googleCalendarSearchEventsToolConfigServer(account.access_token),
    };
  },
);
