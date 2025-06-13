import React from "react";

import { File, User } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ConnectedAccounts } from "./connected-accounts";
import { Attachments } from "./attachments";
import { HStack } from "@/components/ui/stack";

const tabs = [
  {
    label: "Connected Accounts",
    value: "connected-accounts",
    component: <ConnectedAccounts />,
    icon: <User />,
  },
  {
    label: "Attachments",
    value: "attachments",
    component: <Attachments />,
    icon: <File />,
  },
];

interface Props {
  defaultTab?: string;
}

export const AccountTabs: React.FC<Props> = ({ defaultTab }) => {
  return (
    <Tabs defaultValue={defaultTab ?? "connected-accounts"}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            <HStack className="gap-2">
              {tab.icon}
              {tab.label}
            </HStack>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-2">
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};
