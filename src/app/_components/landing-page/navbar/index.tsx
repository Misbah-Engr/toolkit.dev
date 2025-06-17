import { Logo } from "@/components/ui/logo";
import { HStack } from "@/components/ui/stack";
import { ColorModeToggle } from "../../navbar/color-mode-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <HStack className="bg-background sticky top-0 z-10 border-b py-2">
      <HStack className="container mx-auto justify-between px-2">
        <HStack>
          <Logo className="size-6" />
          <h1 className="shimmer-text overflow-hidden text-lg font-bold whitespace-nowrap">
            Toolkit.dev
          </h1>
        </HStack>
        <HStack>
          <Link href="/login">
            <Button className="user-message">Try it Out</Button>
          </Link>
          <ColorModeToggle />
        </HStack>
      </HStack>
    </HStack>
  );
};
