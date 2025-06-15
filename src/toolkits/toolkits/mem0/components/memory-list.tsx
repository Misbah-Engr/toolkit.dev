import React from "react";
import { Brain, Star } from "lucide-react";

export interface MemoryData {
  memory: string;
  score: number;
  metadata?: Record<string, unknown>;
}

interface MemoryListProps {
  memories: MemoryData[];
  title: string;
  emptyMessage: string;
}

export function MemoryList({ memories, title, emptyMessage }: MemoryListProps) {
  if (memories.length === 0) {
    return (
      <div className="text-muted-foreground py-6 text-center">
        <Brain className="mx-auto mb-2 h-8 w-8 opacity-50" />
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <Brain className="h-4 w-4" />
        {title} ({memories.length})
      </h3>
      <div className="space-y-3">
        {memories.map((memory, index) => (
          <MemoryItem key={index} memory={memory} />
        ))}
      </div>
    </div>
  );
}

interface MemoryItemProps {
  memory: MemoryData;
}

function MemoryItem({ memory }: MemoryItemProps) {
  return (
    <div className="bg-card rounded-lg border p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="flex-1 text-sm">{memory.memory}</p>
        <div className="text-muted-foreground flex items-center gap-1 text-xs">
          <Star className="h-3 w-3" />
          <span>{(memory.score * 100).toFixed(0)}%</span>
        </div>
      </div>
      {memory.metadata && Object.keys(memory.metadata).length > 0 && (
        <div className="text-muted-foreground text-xs">
          <details>
            <summary className="hover:text-foreground cursor-pointer">
              View metadata
            </summary>
            <pre className="bg-muted mt-1 overflow-auto rounded p-2 text-xs">
              {JSON.stringify(memory.metadata, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
