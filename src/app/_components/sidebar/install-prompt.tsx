"use client";

import { Button } from "@/components/ui/button";
import { useInstallPrompt } from "@/contexts/install-prompt-context";
import { Download, X } from "lucide-react";

export function InstallPrompt() {
  const {
    installPrompt,
    isIOS,
    isStandalone,
    isDismissed,
    handleInstall,
    dismissPrompt,
  } = useInstallPrompt();

  if (isStandalone || isDismissed) {
    return null; // Don't show if already installed or dismissed
  }

  // Only show if we have an install prompt OR if it's iOS
  if (!installPrompt && !isIOS) {
    return null;
  }

  return (
    <div className="bg-card relative flex flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Install Toolkit.dev</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={dismissPrompt}
          className="text-muted-foreground hover:text-foreground h-6 w-6 p-0 hover:bg-transparent"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {installPrompt ? (
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm">
            Install Toolkit.dev for quick access and a better experience.
          </p>
          <Button onClick={handleInstall} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Install App
          </Button>
        </div>
      ) : isIOS ? (
        <p className="text-muted-foreground text-sm">
          To install this app on your iOS device, tap the share button ⎋ and
          then &ldquo;Add to Home Screen&rdquo; ➕.
        </p>
      ) : null}
    </div>
  );
}
