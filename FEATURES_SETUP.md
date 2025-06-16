# Features System Setup Guide

This guide explains how to set up and use the new Features system that allows you to create features and assign them to users, with an admin panel for management.

## Overview

The Features system consists of:
- **Features Table**: Stores feature definitions (name, description)
- **UserFeatures Table**: Many-to-many mapping between users and features
- **Admin Panel**: Web interface at `/admin` for managing features and user assignments
- **Admin Authorization**: Only users with the "admin" feature can access the admin panel

## Database Setup

### 1. Start the Database

Make sure Docker is installed, then start the PostgreSQL database:

```bash
./start-database.sh
```

### 2. Run Database Migration

Apply the database schema changes:

```bash
npx prisma migrate dev --name add-features-and-user-features
```

This will create the new `Feature` and `UserFeature` tables.

### 3. Generate Prisma Client

Update the Prisma client with the new schema:

```bash
npx prisma generate
```

### 4. Seed Initial Data

Create the initial features (including the required "admin" feature):

```bash
npm run db:seed
```

This will create:
- `admin` - Administrative access to the admin panel
- `premium` - Premium features and enhanced limits
- `beta-access` - Access to beta features and early previews
- `api-access` - Access to API endpoints

## Granting Admin Access

### Option 1: Modify the Seed Script (Recommended)

1. Edit `prisma/seed.ts`
2. Uncomment the lines at the bottom that assign admin access to the first user
3. Run the seed script again: `npm run db:seed`

### Option 2: Direct Database Access

Use Prisma Studio to manually assign the admin feature:

```bash
npm run db:studio
```

1. Open the UserFeature table
2. Create a new record with:
   - `userId`: The ID of the user you want to make admin
   - `featureId`: The ID of the "admin" feature
   - `createdAt`: Current timestamp

### Option 3: Database Query

Connect to your database and run:

```sql
-- Replace 'user-email@example.com' with the actual user's email
-- Replace 'admin-feature-id' with the actual admin feature ID

INSERT INTO "UserFeature" (id, "userId", "featureId", "createdAt")
SELECT 
    gen_random_uuid(),
    u.id,
    f.id,
    NOW()
FROM "User" u, "Feature" f
WHERE u.email = 'user-email@example.com' 
AND f.name = 'admin';
```

## Using the Admin Panel

Once you have admin access:

1. Navigate to `/admin` in your browser
2. You should see the Admin Panel with four main sections:

### Create New Feature
- Add new features that can be assigned to users
- Specify name and optional description

### Search Users
- Search for users by email or name
- View each user's current features (displayed as badges)
- Click the `X` on a feature badge to remove it from the user
- Click the user+ button to add features to a user

### Add Feature to User
- Select a user from the search results
- Choose a feature from the dropdown
- Click "Add Feature" to assign it

### Available Features
- View all features in the system
- See creation dates and descriptions

## API Endpoints

The system provides the following TRPC endpoints:

### Admin-Only Endpoints
- `features.getAllFeatures` - Get all features
- `features.createFeature` - Create a new feature
- `features.searchUsers` - Search users by email/name
- `features.addFeatureToUser` - Assign feature to user
- `features.removeFeatureFromUser` - Remove feature from user

### User Endpoints
- `features.getUserFeatures` - Get features for a user (own features or admin can view any)
- `features.isAdmin` - Check if current user has admin access

## Development Notes

### File Structure
```
prisma/
├── schema.prisma              # Updated with Feature and UserFeature models
├── seed.ts                    # Seed script for initial features
└── migrations/
    └── 20240615000000_add_features_and_user_features/
        └── migration.sql      # Database migration

src/
├── server/api/routers/
│   └── features.ts           # TRPC router with all feature endpoints
└── app/
    └── admin/
        └── page.tsx          # Admin panel component
```

### Security
- Admin access is controlled by the "admin" feature
- Users can only view their own features unless they have admin access
- All admin operations require the admin feature
- The admin panel redirects non-admin users to the home page

### Database Schema
```sql
-- Features table
CREATE TABLE "Feature" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- User-Feature mapping
CREATE TABLE "UserFeature" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE,
    UNIQUE("userId", "featureId")
);
```

## Troubleshooting

### Admin Panel Shows "Forbidden"
- Ensure you have the "admin" feature assigned to your user
- Check that you're logged in
- Verify the admin feature exists in the database

### Database Connection Issues
- Make sure PostgreSQL is running: `./start-database.sh`
- Check your `.env` file has the correct `DATABASE_URL`

### Migration Issues
- If migration fails, check the database is running
- Ensure no other processes are using the database
- Try resetting: `npx prisma migrate reset` (⚠️ This will delete all data)

### Seed Script Issues
- Make sure the migration has been run first
- Check that `tsx` is installed: `npm install -D tsx`
- Verify the database connection is working

## Next Steps

You can now:
1. Create custom features for your application
2. Assign features to users through the admin panel
3. Check for features in your application code using the TRPC endpoints
4. Build feature-gated functionality based on user features

Example usage in your components:
```tsx
const { data: userFeatures } = api.features.getUserFeatures.useQuery();
const hasPremium = userFeatures?.some(uf => uf.feature.name === 'premium');

if (hasPremium) {
  // Show premium features
}
```