![Banner Image](/banner.png)

# [Toolkit.dev](https://toolkit.dev)

The chatbot that **pays every merged PR**. Join us in building a **self-funding repository** for the usage-based economy.

## Getting Started

### 1) Clone the Repository

```bash
git clone https://github.com/jasonhedman/toolkit.dev.git
```

### 2) Install Dependencies

```bash
pnpm install
```

### 3) Copy the `.env.example` file into `.env`

```bash
cp .env.example .env
```

### 4) Setup the database

Toolkit uses Postgres as a database. You have two options for running the database

#### 4.1) Use the `./start-database.sh` script (recommended)

```bash
./start-database.sh
```

This will also run all database migrations

> This requires either Docker or Podman to be installed on your machine.
>
> Docker installation guide: https://docs.docker.com/engine/install/
>
> Podman installation guide: https://podman.io/getting-started/installation

#### 4.2) Use your own Postgres instance

Update `DATABASE_URL` in your `.env` to point to your Postgres instance.

```
DATABASE_URL=<your Postgres instance URL>
```

You will also need to run all of the migrations

```bash
pnpm db:generate
```

### 5) Get an OpenRouter Key

Toolkit uses OpenRouter for inference. Get a key [here](https://openrouter.ai/settings/keys) and add it to your `.env`

```
OPENROUTER_API_KEY=<your API key>
```

### 6) Add an auth provider

Toolkit uses [Auth.js](https://authjs.dev/) for user authentication.

You will need one of these providers to run the app:

- [Discord Provider](https://authjs.dev/getting-started/providers/discord)
- [Google Provider](https://authjs.dev/getting-started/providers/google)
- [Github Provider](https://authjs.dev/getting-started/providers/github)
- [Twitter Provider](https://authjs.dev/getting-started/providers/twitter)
- [Notion Provider](https://authjs.dev/getting-started/providers/notion)

> We are currently working on adding anonymous auth in the development environment so that you do not have to set up a provider ([Issue #127](https://github.com/jasonhedman/toolkit.dev/issues/127))
