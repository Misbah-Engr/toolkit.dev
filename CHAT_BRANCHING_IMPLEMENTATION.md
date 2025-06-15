# Chat Branching Implementation

This document outlines the implementation of chat branching functionality in the open-chat application.

## Overview

Chat branching allows users to create a new chat conversation starting from any assistant message in an existing chat. This is useful for exploring different conversation paths or continuing a discussion from a specific point.

## Database Schema Changes

### Chat Model Updates
- **Added `parentChatId` field**: Optional field that references the original chat when a chat is branched
- **Added `parentChat` relation**: Self-referencing relation to the parent chat
- **Added `branches` relation**: One-to-many relation to child/branched chats

### Message Model Updates
- **Added `modelId` field**: Optional field to track which AI model generated a specific message

```prisma
model Chat {
    id           String     @id @default(uuid())
    createdAt    DateTime   @default(now())
    title        String
    userId       String
    visibility   Visibility @default(private)
    parentChatId String?    // For branched chats
    user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
    parentChat   Chat?      @relation("ChatBranch", fields: [parentChatId], references: [id], onDelete: Cascade)
    branches     Chat[]     @relation("ChatBranch")
    messages     Message[]
    stream       Stream[]
}

model Message {
    id          String   @id @default(uuid())
    chatId      String
    role        String
    parts       Json
    attachments Json[]
    modelId     String?  // For tracking which model generated the message
    createdAt   DateTime @default(now())
    chat        Chat     @relation(fields: [chatId], references: [id], onDelete: Cascade)
}
```

## API Implementation

### New tRPC Mutation: `branchChat`

**Location**: `src/server/api/routers/chats.ts`

**Input Schema**:
```typescript
{
  originalChatId: string;  // ID of the chat to branch from
  messageId: string;       // ID of the message to branch at
  title: string;           // Title for the new branched chat
}
```

**Functionality**:
1. Validates user ownership of the original chat
2. Retrieves all messages from the original chat up to and including the specified message
3. Creates a new chat with `parentChatId` set to the original chat ID
4. Copies all relevant messages to the new chat
5. Returns the newly created chat

## Frontend Implementation

### Message Actions Component Updates

**Location**: `src/app/(chat)/_components/messages/message-actions.tsx`

**New Features**:
- Added branch button (Share icon) that appears on assistant messages
- Integrated with tRPC `branchChat` mutation
- Automatic navigation to the new branched chat on success
- Loading state during branch operation
- Error handling with toast notifications

**Branch Button Behavior**:
- Only appears on assistant messages (not user messages)
- Disabled during loading/processing
- Generates automatic title based on message content
- Shows tooltip: "Branch chat from here"

### Message Component Updates

**Location**: `src/app/(chat)/_components/messages/message.tsx`

**Changes**:
- Added `chatId` prop to component interface
- Passes `chatId` to `MessageActions` component

### Messages Container Updates

**Location**: `src/app/(chat)/_components/messages/index.tsx`

**Changes**:
- Passes `chatId` prop to each `PreviewMessage` component

### Sidebar Chat Item Updates

**Location**: `src/app/_components/sidebar/chats/item.tsx`

**New Features**:
- Visual indicator (ArrowUpRight icon) for branched chats
- Shows when a chat has a `parentChatId` (indicating it's a branch)
- Maintains all existing functionality (sharing, deleting, etc.)

## User Experience

### Creating a Branch
1. User navigates to any chat with assistant messages
2. Hovers over an assistant message to reveal action buttons
3. Clicks the branch button (Share icon)
4. System creates a new chat containing all messages up to that point
5. User is automatically redirected to the new branched chat
6. Success notification is displayed

### Visual Indicators
- **In Sidebar**: Branched chats show an arrow icon (↗) next to their title
- **Branch Button**: Appears on hover for assistant messages only
- **Loading States**: Button shows disabled state during processing

### Branch Naming
- Automatically generates titles in format: "Branch: [first 50 chars of message]..."
- Falls back to "Branched Chat" if no text content is available

## Technical Details

### Error Handling
- Validates chat ownership before branching
- Ensures message exists in the specified chat
- Provides user-friendly error messages via toast notifications

### Performance Considerations
- Uses efficient database queries to copy messages
- Minimal data duplication (only necessary message data)
- Leverages existing tRPC infrastructure for optimal caching

### Type Safety
- Full TypeScript coverage for all new components and APIs
- Proper Prisma type integration
- Input validation using Zod schemas

## Future Enhancements

Potential improvements that could be added:

1. **Branch Visualization**: Show branch tree/hierarchy in the sidebar
2. **Merge Functionality**: Allow merging branches back together
3. **Branch Comparison**: Compare different branch paths
4. **Bulk Branching**: Create multiple branches from different points
5. **Branch Templates**: Save common branching patterns
6. **Branch Analytics**: Track which branches are most successful

## Testing

To test the branching functionality:

1. Start a conversation with an AI assistant
2. Have several message exchanges
3. Hover over any assistant message
4. Click the branch button (Share icon)
5. Verify you're redirected to a new chat
6. Confirm the new chat contains all messages up to the branch point
7. Check the sidebar shows the branch indicator for the new chat

The implementation is fully functional and ready for use in development and production environments.