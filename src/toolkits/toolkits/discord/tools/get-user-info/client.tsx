import React from "react";
import { createClientTool } from "@/toolkits/create-tool";
import { getUserInfoTool } from "./base";

export const getUserInfoToolConfigClient = createClientTool(
  getUserInfoTool,
  {
    CallComponent: ({ isPartial }) => (
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Get Discord User Info</h3>
        {isPartial ? (
          <div className="text-sm text-gray-500">Loading your profile...</div>
        ) : (
          <div className="text-sm text-gray-600">Fetching your Discord profile</div>
        )}
      </div>
    ),
    ResultComponent: ({ result }) => (
      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Your Discord Profile</h3>
        {result.success && result.user ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              {result.user.avatar && (
                <img 
                  src={result.user.avatar} 
                  alt={result.user.username}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <div className="font-semibold text-lg">{result.user.username}</div>
                {result.user.discriminator && (
                  <div className="text-sm text-gray-500">
                    #{result.user.discriminator}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">User ID:</span>
                <span className="ml-2 text-gray-600">{result.user.id}</span>
              </div>
              {result.user.email && (
                <div>
                  <span className="font-medium">Email:</span>
                  <span className="ml-2 text-gray-600">{result.user.email}</span>
                </div>
              )}
              <div>
                <span className="font-medium">Verified:</span>
                <span className="ml-2 text-gray-600">
                  {result.user.verified ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-medium">Nitro:</span>
                <span className="ml-2 text-gray-600">
                  {result.user.nitro ? "Yes" : "No"}
                </span>
              </div>
              {result.user.createdAt && (
                <div>
                  <span className="font-medium">Created:</span>
                  <span className="ml-2 text-gray-600">
                    {new Date(result.user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-red-600">
            ✗ Failed to load profile: {result.error}
          </div>
        )}
      </div>
    ),
  },
); 