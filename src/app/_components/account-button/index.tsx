import { Unauthenticated } from "./unauthenticated";
import { Authenticated } from "./authenticated";

import { auth } from "@/server/auth";
import { providers } from "@/server/auth/providers";

export const AccountButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Unauthenticated
        providers={providers.map((provider) => ({
          name: provider.name,
          id: provider.id,
        }))}
      />
    );
  }

  return <Authenticated session={session} />;
};
