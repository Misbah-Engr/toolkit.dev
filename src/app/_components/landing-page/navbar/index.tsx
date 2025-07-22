import { Logo } from "@/components/ui/logo";
import { HStack } from "@/components/ui/stack";
import { ColorModeToggle } from "../../navbar/color-mode-toggle";
import { Button } from "@/components/ui/button";
import { AuthModal } from "../lib/auth-modal";

export const Navbar = () => {
  return (
    <HStack className="bg-background/50 sticky top-0 z-50 h-16 w-full border-b py-2 backdrop-blur-sm">
      <HStack className="container mx-auto justify-between px-2">
        <HStack>
          <Logo className="size-6" />
          <h1 className="shimmer-text overflow-hidden text-lg font-bold whitespace-nowrap">
            Toolkit.dev
          </h1>
        </HStack>
        <HStack>
          <AuthModal>
            <Button className="user-message">Try it Out</Button>
          </AuthModal>
          <ColorModeToggle />
        </HStack>
      </HStack>
    </HStack>
  );
};
