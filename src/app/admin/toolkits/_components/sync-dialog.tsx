"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  Database,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { api } from "@/trpc/react";
import { clientToolkits } from "@/toolkits/toolkits/client";

interface SyncDialogProps {
  onSyncComplete?: () => void;
}

export function SyncDialog({ onSyncComplete }: SyncDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>("");
  const [syncResults, setSyncResults] = useState<{
    created: number;
    updated: number;
    errors: string[];
  } | null>(null);

  const syncMutation = api.toolkits.syncToolkits.useMutation({
    onSuccess: (data) => {
      setSyncResults(data);
      setSyncStatus("Sync completed successfully!");
      onSyncComplete?.();
    },
    onError: (error) => {
      setSyncStatus(`Sync failed: ${error.message}`);
      setSyncResults({
        created: 0,
        updated: 0,
        errors: [error.message],
      });
    },
  });

  const handleSync = async () => {
    setSyncStatus("Starting sync...");
    setSyncResults(null);

    try {
      await syncMutation.mutateAsync();
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const totalToolkits = Object.keys(clientToolkits).length;
  const totalTools = Object.values(clientToolkits).reduce(
    (sum, toolkit) => sum + Object.keys(toolkit.tools).length,
    0,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Toolkits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sync Toolkit Data</DialogTitle>
          <DialogDescription>
            Sync toolkit and tool data with the database. This will create
            missing toolkits and tools.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="rounded-lg border p-4">
            <div className="mb-3 flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="font-medium">Summary</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Toolkits</div>
                <div className="font-medium">{totalToolkits}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Tools</div>
                <div className="font-medium">{totalTools}</div>
              </div>
            </div>
          </div>

          {/* Status */}
          {syncMutation.isPending && (
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{syncStatus}</span>
            </div>
          )}

          {/* Results */}
          {syncResults && (
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center gap-2">
                {syncResults.errors.length > 0 ? (
                  <AlertCircle className="text-destructive h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <span className="font-medium">Sync Results</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Created</div>
                  <div className="font-medium text-green-600">
                    {syncResults.created}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Updated</div>
                  <div className="font-medium text-blue-600">
                    {syncResults.updated}
                  </div>
                </div>
              </div>

              {syncResults.errors.length > 0 && (
                <div className="space-y-1">
                  <div className="text-destructive text-sm font-medium">
                    Errors:
                  </div>
                  {syncResults.errors.map((error, index) => (
                    <div key={index} className="text-destructive text-xs">
                      {error}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={syncMutation.isPending}
          >
            Close
          </Button>
          <Button
            onClick={handleSync}
            disabled={syncMutation.isPending}
            className="gap-2"
          >
            {syncMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Start Sync
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
