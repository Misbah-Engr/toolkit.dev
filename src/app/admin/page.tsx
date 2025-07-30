import { redirect, notFound } from "next/navigation";
import { auth } from "@/server/auth";
import { AdminPanel } from "./_components/admin-panel";
import { IS_DEVELOPMENT } from "@/lib/constants";

export default async function AdminPage() {
  // Check authentication
  const session = await auth();

  if (!session) {
    redirect("/login?redirect=/admin");
  }

  // Check if user has admin access
  try {
    const isAdmin = session.user.role === "ADMIN" || IS_DEVELOPMENT;

    if (!isAdmin) {
      notFound();
    }
  } catch (error) {
    console.error(error);
    // If there's an error checking admin status, deny access
    notFound();
  }

  // If user is admin, render the admin panel
  return <AdminPanel />;
}
