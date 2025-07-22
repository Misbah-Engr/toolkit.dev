import { Octokit } from "octokit";
import { Section } from "../lib/section";
import { SECTIONS } from "../sections";
import { UserAvatarCirclesByLogin } from "./user-avatar-circles";
import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/magicui/ripple";
import { HStack } from "@/components/ui/stack";

export const ContributorsSection = async () => {
  const { data: contributors } = await new Octokit({
    auth: process.env.GITHUB_TOKEN,
  }).rest.repos.listContributors({
    owner: "jasonhedman",
    repo: "toolkit.dev",
  });

  return (
    <Section
      id={SECTIONS.Contributors}
      className="relative flex flex-col items-center gap-6 md:py-8"
    >
      <HStack className="h-14">
        <h2 className="max-w-sm text-center text-xl font-bold">
          We are grateful to the contributors who make Toolkit better every day
        </h2>
      </HStack>
      <UserAvatarCirclesByLogin
        logins={contributors
          .filter(
            (contributor) =>
              contributor.login && contributor.login !== "cursoragent",
          )
          .map((contributor) => contributor.login!)}
        totalUsers={contributors.length}
        size={48}
      />
      <HStack className="h-14">
        <Link href="https://github.com/jasonhedman/toolkit.dev" target="_blank">
          <Button variant="outline">
            <SiGithub className="size-4" />
            Become a Contributor
          </Button>
        </Link>
      </HStack>
      <Ripple className="absolute inset-0 opacity-80 dark:opacity-40" />
    </Section>
  );
};
