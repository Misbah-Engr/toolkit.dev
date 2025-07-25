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
