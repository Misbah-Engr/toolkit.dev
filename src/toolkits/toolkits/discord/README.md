# Discord Toolkit

A user-friendly Discord toolkit for the toolkit.dev platform that focuses on exploring and searching your Discord content.

## Features

### Tools

1. **List Servers** (`list-servers`)
   - Get a list of all Discord servers you are a member of
   - Shows server names, icons, member counts, and ownership status
   - No input required - uses your authenticated account
   - Output: List of servers with basic information

2. **Get User Info** (`get-user-info`)
   - Retrieve detailed information about your Discord account
   - Shows username, avatar, verification status, Nitro status, and account creation date
   - No input required - uses your authenticated account
   - Output: Your Discord profile information

## Structure

```
discord/
├── base.ts              # Base configuration and parameters
├── client.tsx           # Client-side toolkit configuration
├── server.ts            # Server-side toolkit configuration
├── tools/
│   ├── index.ts         # Tool exports and enum
│   ├── list-servers.ts  # List servers tool
│   ├── get-user-info.ts # Get user info tool
└── README.md           # This file
```

## Usage

The Discord toolkit is designed for normal Discord users who want to:

- **Discover**: See all the servers they're a member of
- **Profile**: Check their account information and status

## User-Friendly Design

This toolkit is designed with normal Discord users in mind:

- **No Technical Knowledge Required**: No need to know guild IDs or channel IDs
- **Read-Only Operations**: Focus on exploring and searching, not sending messages
- **Authenticated Access**: Uses your Discord account to access your data
- **Simple Interface**: Clean, intuitive UI components

## Implementation Notes

This is a basic implementation with placeholder server-side logic. In a production environment, you would need to:

1. Install and configure Discord.js
2. Set up Discord OAuth2 authentication for user accounts
3. Implement real API calls to Discord's REST API
4. Add proper error handling and rate limiting
5. Configure appropriate scopes for user data access

## Parameters

The toolkit requires no parameters - it uses your authenticated Discord account.

## Tool Sequencing

Recommended workflows:
1. **Server Discovery**: List servers → Explore specific servers → Search for content
2. **Profile Check**: Get user info → Understand account capabilities → Plan searches

## Use Cases

Perfect for users who want to:
- Discover what servers they're in
- Check their account status
- Research topics across their Discord communities
- Organize and explore their Discord presence

## Future Enhancements

- Add server activity analytics
- Include user interaction patterns
- Add support for pinned messages