import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConnectedAccounts } from "./connected-accounts";

const tabs = [
  {
    label: "Connected Accounts",
    value: "connected-accounts",
    component: <ConnectedAccounts />,
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
            {tab.label}
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
