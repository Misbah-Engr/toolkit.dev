import { signIn } from "@/server/auth";
import { IS_DEVELOPMENT } from "@/lib/constants";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (!IS_DEVELOPMENT) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const redirectUrl = searchParams.get("redirectUrl") ?? "/";

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: false,
  });

  if (token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return signIn("guest", { redirect: true, redirectTo: redirectUrl });
}
