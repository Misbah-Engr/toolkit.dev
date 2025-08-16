# Changelog

## 2025-08-15

- Migrate to ai v5 and @ai-sdk/react v2.
- Switch to parts-based UIMessage (text, file, reasoning, tool-invocation).
- Server streaming refactor using result.toUIMessageStream.
- Removed experimental_attachments in favor of file parts.
- Preserved DB persistence and resumable streaming.
- Improved setup resiliency (Docker/DB optional in dev).
