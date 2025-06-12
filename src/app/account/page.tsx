import { auth } from "@/server/auth";

import { redirect } from "next/navigation";

import { api } from "@/trpc/server";

import type { NextPage } from "next";
import { AccountHeader } from "./components/header";

const AccountPage: NextPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await api.users.getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-2 py-4">
      <AccountHeader user={user} />
    </div>
  );
};

export default AccountPage;
