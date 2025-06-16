# PostgreSQL Migration Guide

The database schema has been updated back to PostgreSQL. Follow these steps to complete the migration:

## Prerequisites

1. **PostgreSQL Database Running**: Ensure you have a PostgreSQL database running locally or accessible remotely
2. **Environment Variables**: Make sure your `.env` file has the correct `DATABASE_URL` for PostgreSQL

## Migration Steps

### 1. Start PostgreSQL Database

If using Docker:
```bash
./start-database.sh
```

If using local PostgreSQL installation, ensure it's running on the configured port (default: 5432).

### 2. Generate Initial Migration

```bash
pnpm db:generate
```

This will create a new migration that includes:
- All existing tables (User, Chat, Message, etc.)
- New Workbench table with PostgreSQL-native features
- Proper relationships and constraints

### 3. Apply Migration

```bash
pnpm db:migrate
```

### 4. Seed Database (Optional)

```bash
pnpm db:seed
```

## Key Changes from SQLite to PostgreSQL

### Schema Changes

1. **Database Provider**: Changed from `sqlite` to `postgresql`
2. **Text Fields**: Restored `@db.Text` annotations for large text fields
3. **Array Fields**: Using native PostgreSQL arrays instead of comma-separated strings
4. **JSON Arrays**: Restored `Json[]` type for attachments

### API Changes

1. **Workbench Router**: Removed SQLite-specific string conversion functions
2. **Array Handling**: Direct array operations (no more comma-separated workarounds)
3. **Type Safety**: Full PostgreSQL type support restored

### Updated Models

#### Workbench Model
```prisma
model Workbench {
    id           String   @id @default(uuid())
    name         String
    systemPrompt String   @db.Text      // Large text support
    toolkitIds   String[] // Native array support
    userId       String
    createdAt    DateTime @default(now())
    updatedAt    DateTime @updatedAt
    user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    chats        Chat[]
}
```

#### Message Model
```prisma
model Message {
    id          String   @id @default(uuid())
    chatId      String
    role        String
    parts       Json
    attachments Json[]   // Native JSON array support
    modelId     String   @default("openai:gpt-4o")
    createdAt   DateTime @default(now())
    chat        Chat     @relation(fields: [chatId], references: [id], onDelete: Cascade)
}
```

## Verification

After completing the migration, verify the setup:

1. **Check Database Connection**:
   ```bash
   pnpm prisma db pull
   ```

2. **Verify Schema**:
   ```bash
   pnpm prisma studio
   ```

3. **Test Workbench API**:
   - Start the application: `pnpm dev`
   - Navigate to `/workbenches`
   - Create a test workbench
   - Verify array fields work correctly

## Troubleshooting

### Connection Issues
- Verify DATABASE_URL format: `postgresql://username:password@host:port/database`
- Check PostgreSQL service is running
- Verify network connectivity and firewall settings

### Migration Conflicts
If you encounter migration conflicts:
```bash
# Reset and start fresh
pnpm prisma migrate reset --force
pnpm db:generate
```

### Type Errors
After migration, regenerate Prisma client:
```bash
pnpm prisma generate
```

## Environment-Specific Notes

### Development
- Use Docker Compose for consistent PostgreSQL setup
- Consider using connection pooling for better performance

### Production
- Ensure proper backup strategies
- Use environment-specific connection strings
- Monitor database performance and indexes

## Next Steps

1. Run the migration commands above
2. Test the workbench functionality
3. Verify all existing features still work
4. Consider adding database indexes for better performance

The workbench system is now fully compatible with PostgreSQL and should provide better performance and reliability compared to the SQLite implementation.