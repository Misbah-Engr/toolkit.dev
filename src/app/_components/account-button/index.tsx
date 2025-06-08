import { auth } from "@/server/auth";

export const AccountButton = async () => {
  const session = await auth();

  return (
    <div>
      <button>{session?.user ? "Logout" : "Login"}</button>
    </div>
  );
};
