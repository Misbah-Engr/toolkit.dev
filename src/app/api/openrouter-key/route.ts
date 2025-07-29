import { setEnvVar } from "@/actions/add-env-var";
import { IS_PRODUCTION } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  if (IS_PRODUCTION) {
    return NextResponse.json({
      error: "Getting an OpenRouter key is a development-only utility.",
    });
  }

  const params = request.nextUrl.searchParams;

  const code = params.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/auth/keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { key } = (await response.json()) as { key: string };

  const { success } = await setEnvVar([
    { key: "OPENROUTER_API_KEY", value: key },
  ]);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to set environment variable" },
      { status: 500 },
    );
  }

  revalidatePath("/", "layout");

  return redirect("/");
};
