import React from "react";
import { Brain, Star } from "lucide-react";

export interface MemoryData {
  memory: string;
  score: number;
  metadata?: Record<string, any>;
}

interface MemoryListProps {
  memories: MemoryData[];
  title: string;
  emptyMessage: string;
}

export function MemoryList({ memories, title, emptyMessage }: MemoryListProps) {
  if (memories.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center gap-2">
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
    <div className="p-3 rounded-lg border bg-card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm flex-1">{memory.memory}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3" />
          <span>{(memory.score * 100).toFixed(0)}%</span>
        </div>
      </div>
      {memory.metadata && Object.keys(memory.metadata).length > 0 && (
        <div className="text-xs text-muted-foreground">
          <details>
            <summary className="cursor-pointer hover:text-foreground">
              View metadata
            </summary>
            <pre className="mt-1 p-2 bg-muted rounded text-xs overflow-auto">
              {JSON.stringify(memory.metadata, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}