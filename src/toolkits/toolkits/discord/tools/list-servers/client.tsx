import React from "react";
import { createClientTool } from "@/toolkits/create-tool";
import { listServersTool } from "./base";

export const listServersToolConfigClient = createClientTool(
  listServersTool,
  {
    CallComponent: ({ isPartial }) => (
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">List Discord Servers</h3>
        {isPartial ? (
          <div className="text-sm text-gray-500">Loading your servers...</div>
        ) : (
          <div className="text-sm text-gray-600">Fetching your Discord servers</div>
        )}
      </div>
    ),
    ResultComponent: ({ result }) => (
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Your Discord Servers</h3>
        {result.success && result.servers ? (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              Found {result.servers.length} servers:
            </div>
            <div className="space-y-1">
              {result.servers.map(server => (
                <div key={server.id} className="text-sm flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {server.icon && (
                      <img 
                        src={server.icon} 
                        alt={server.name}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="font-medium">{server.name}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {server.owner ? "Owner" : "Member"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-red-600">
            ✗ Failed to load servers: {result.error}
          </div>
        )}
      </div>
    ),
  },
); 