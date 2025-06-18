# Toolkit Development Guide

## What are Toolkits?

Toolkits are extensible collections of AI tools that provide specific capabilities to the chat interface. Each toolkit contains multiple related tools (e.g., a "Web Search" toolkit might include general search, company research, and Wikipedia search tools).

## Integration

Once you've created your toolkit, integrating it into the OpenChat system is simple. Just add your toolkit to the registry objects, and it's immediately available in the UI.

### Registration Process

After building your toolkit, you need to register it in three places:

1. Add your toolkit id to the enum in `shared.ts`
2. Import and add it to the `clientToolkits` object in `client.ts`
3. Import and add it to the `serverToolkits` object in `server.ts`

That's it! Once added to these objects, your toolkit will immediately appear in the UI with full functionality.

## Architecture Overview

The toolkit system uses a **client/server separation** architecture where each toolkit has both client-side and server-side implementations:

```
toolkit/
├── base.ts          # Shared configuration and schemas
├── client.tsx       # UI components and client logic
├── server.ts        # Server-side tool execution
└── tools/
    ├── tools.ts     # Tool name definitions
    └── tool-name/
        ├── base.ts  # Tool schema definition
        ├── client.tsx # Tool UI components
        └── server.ts  # Tool execution logic
```

## Why Client/Server Separation?

The separation serves several critical purposes:

### **Security & API Key Management**

- Server-side code runs in a secure environment with access to API keys
- Client-side code never imports server-side code that depends on API keys

### **Type Safety**

- Shared schemas ensure type consistency between client and server
- Zod schemas provide runtime validation
- TypeScript ensures compile-time safety

## Toolkit Structure

### Core Files

#### `types.ts` - Type Definitions

Defines the fundamental types for the entire toolkit system:

- `BaseTool` - Shared tool definition with schemas
- `ClientTool` - Client-side tool with UI components
- `ServerTool` - Server-side tool with execution logic
- `ClientToolkit` & `ServerToolkit` - Complete toolkit definitions

#### `create-toolkit.ts` - Toolkit Factories

Provides factory functions to create toolkits:

- `createClientToolkit()` - Combines base config with client-specific config
- `createServerToolkit()` - Combines base config with server-specific config

#### `create-tool.ts` - Tool Factories

Provides factory functions to create individual tools:

- `createBaseTool()` - Creates shared tool definition
- `createClientTool()` - Adds client UI components
- `createServerTool()` - Adds server execution logic

## Building Your First Toolkit

### Step 1: Plan Your Toolkit

Define:

- **Purpose**: What domain does your toolkit cover?
- **Tools**: What specific actions will it provide?
- **Parameters**: What configuration does it need?
- **Dependencies**: What external APIs or services?

### Step 2: Create the Directory Structure

```bash
mkdir -p src/toolkits/toolkits/my-toolkit/tools/my-tool
```

### Step 3: Define Tool Names

Create `tools/tools.ts`:

```typescript
export enum MyToolkitTools {
  MyTool = "my-tool",
  AnotherTool = "another-tool",
}
```

### Step 4: Create Base Configuration

Create `base.ts`:

```typescript
import { z } from "zod";
import type { ToolkitConfig } from "@/toolkits/types";
import { baseMyTool } from "./tools/my-tool/base";
import { MyToolkitTools } from "./tools/tools";

export const myToolkitParameters = z.object({
  // any input needed from the user on the client
});

export const baseMyToolkitConfig: ToolkitConfig<
  MyToolkitTools,
  typeof myToolkitParameters.shape
> = {
  tools: {
    [MyToolkitTools.MyTool]: baseMyTool,
    // Add other tools
  },
  parameters: myToolkitParameters,
};
```

### Step 5: Create Tool Base Schema

Create `tools/my-tool/base.ts`:

```typescript
import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const baseMyTool = createBaseTool({
  description: "Describe what this tool does",
  inputSchema: z.object({
    query: z.string().min(1).max(100),
    // Add input parameters
  }),
  outputSchema: z.object({
    result: z.string(),
    // Add output fields
  }),
});
```

### Step 6: Implement Server-Side Logic

Create `tools/my-tool/server.ts`:

```typescript
import type { ServerToolConfig } from "@/toolkits/types";
import type { baseMyTool } from "./base";

export const myToolConfigServer: ServerToolConfig<
  typeof baseMyTool.inputSchema.shape,
  typeof baseMyTool.outputSchema.shape
> = {
  callback: async (args) => {
    // Implement your tool logic here
    const result = await callExternalAPI(args.query);

    return {
      result: result.data,
    };
  },
  message: (result) => `Tool completed: ${result.result}`,
};
```

### Step 7: Create Client UI Components

Create `tools/my-tool/client.tsx`:

```typescript
import type { ClientToolConfig } from "@/toolkits/types";
import type { baseMyTool } from "./base";

export const myToolConfigClient: ClientToolConfig<
  typeof baseMyTool.inputSchema.shape,
  typeof baseMyTool.outputSchema.shape
> = {
  CallComponent: ({ args, isPartial }) => (
    <div className="flex items-center gap-2">
      <span>🔍</span>
      <span>Searching for: {args.query}</span>
      {isPartial && <span className="animate-pulse">...</span>}
    </div>
  ),
  ResultComponent: ({ args, result }) => (
    <div className="border rounded p-4">
      <h3>Search Results for: {args.query}</h3>
      <p>{result.result}</p>
    </div>
  ),
};
```

### Step 8: Create Client Toolkit

Create `client.tsx`:

```typescript
import { MyIcon } from "lucide-react";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { ToolkitGroups } from "@/toolkits/types";
import { baseMyToolkitConfig } from "./base";
import { MyToolkitTools } from "./tools/tools";
import { myToolConfigClient } from "./tools/my-tool/client";

export const myClientToolkit = createClientToolkit(
  baseMyToolkitConfig,
  {
    name: "My Toolkit",
    description: "Brief description of what this toolkit does",
    icon: MyIcon,
    form: null, // if the toolkit requires parameters from the user, add a form here
    type: ToolkitGroups.DataSource, // Choose appropriate group
    addToolkitWrapper: ({ children }) => <div>{children}</div> // if you need escalated permission s from the user, you can wrap the add button to ensure you have the necessary scopes
  },
  {
    [MyToolkitTools.MyTool]: myToolConfigClient,
    // Add other tool clients
  },
);
```

### Step 9: Create Server Toolkit

Create `server.ts`:

```typescript
import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseMyToolkitConfig } from "./base";
import { MyToolkitTools } from "./tools/tools";
import { myToolConfigServer } from "./tools/my-tool/server";

export const myToolkitServer = createServerToolkit(
  baseMyToolkitConfig,
  `System prompt for the AI explaining how to use this toolkit effectively.
  
  Provide guidance on:
  - When to use each tool
  - How to sequence tool calls
  - Best practices for this domain`,
  async (params) => {
    return {
      [MyToolkitTools.MyTool]: myToolConfigServer,
      // Add other tool servers
    };
  },
);
```

### Step 10: Register Your Toolkit

1. Add your toolkit to `shared.ts`:

```typescript
export enum Toolkits {
  // ... existing toolkits
  MyToolkit = "my-toolkit",
}

export type ServerToolkitNames = {
  // ... existing mappings
  [Toolkits.MyToolkit]: MyToolkitTools;
};

export type ServerToolkitParameters = {
  // ... existing mappings
  [Toolkits.MyToolkit]: typeof myToolkitParameters.shape;
};
```

2. Add to `client.ts`:

```typescript
import { myClientToolkit } from "./my-toolkit/client";

export const clientToolkits: ClientToolkits = {
  // ... existing toolkits
  [Toolkits.MyToolkit]: myClientToolkit,
};
```

3. Add to `server.ts`:

```typescript
import { myToolkitServer } from "./my-toolkit/server";

export const serverToolkits: ServerToolkits = {
  // ... existing toolkits
  [Toolkits.MyToolkit]: myToolkitServer,
};
```

## Best Practices

### **Tool Design**

- Keep tools focused on single responsibilities
- Use clear, descriptive names and descriptions
- Design intuitive input/output schemas
- Provide helpful error messages

### **Parameter Management**

- Use Zod schemas for all inputs and outputs
- Validate parameters on both client and server
- Provide sensible defaults where possible

### **UI Components**

- Create responsive, accessible components
- Show loading states for long-running operations
- Provide clear visual feedback
- Handle error states gracefully

### **Documentation**

- Write clear tool descriptions
- Provide helpful system prompts
- Include usage examples
- Document parameter requirements

## Examples to Study

Look at existing toolkits for inspiration:

- **`exa/`** - Web search with multiple specialized tools
- **`github/`** - API integration with authentication
- **`image/`** - File handling and processing
- **`notion/`** - Complex API with rich data structures

## Toolkit Groups

Organize your toolkit into the appropriate group:

- **`ToolkitGroups.Native`** - Built-in system tools
- **`ToolkitGroups.DataSource`** - External data and search
- **`ToolkitGroups.KnowledgeBase`** - Document and knowledge management

You can also create a new group if your toolkit does not fall into one of these categories

Happy toolkit building!
