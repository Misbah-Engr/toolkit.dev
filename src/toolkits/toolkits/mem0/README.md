# Mem0 Memory Toolkit

This toolkit provides memory capabilities for conversational AI using the Mem0 API. It allows storing and retrieving memories to provide personalized and contextual responses.

## Features

- **Add Memory**: Store new memories with user context
- **Search Memories**: Retrieve relevant memories based on queries
- **User-specific**: Memories are stored per user ID
- **Relevance Scoring**: Search results include relevance scores

## Tools

### Add Memory
- **Purpose**: Store new information about users, preferences, or context
- **When to use**: Called automatically when users share personal information or explicitly ask to remember something
- **Parameters**:
  - `content`: The information to store
  - `userId`: User identifier (defaults to "mem0-mcp-user")

### Search Memories
- **Purpose**: Retrieve relevant stored memories
- **When to use**: Called for any user query to provide personalized responses
- **Parameters**:
  - `query`: The search query
  - `userId`: User identifier (defaults to "mem0-mcp-user")

## Configuration

Make sure to set the following environment variable:
```bash
export MEM0_API_KEY="your-mem0-api-key"
```

## Dependencies

- `mem0ai`: Mem0 client library
- `zod`: Schema validation
- `lucide-react`: Icons
- `react`: UI components

## Usage

The toolkit automatically integrates with the conversation flow:
1. When users share information, `add-memory` is called to store it
2. When users ask questions, `search-memories` retrieves relevant context
3. The AI uses this context to provide more personalized responses

## UI Components

- **ToolCallDisplay**: Shows tool invocation details
- **MemoryList**: Displays search results with relevance scores
- **MemoryItem**: Individual memory display with metadata