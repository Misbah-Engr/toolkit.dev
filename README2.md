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

### 7) [OPTIONAL] Set up Toolkits

Many of our Toolkits require extra keys. You can run Toolkit without these keys, but if you want to use a certain Toolkit locally, you will need to do some additional configuration

#### 7.1) Web Search Toolkit

Toolkit uses Exa for web search. Get an API key [here](https://dashboard.exa.ai/api-keys) and add it to your `.env`

```
EXA_API_KEY=<your API key>
```

#### 7.2) Code Interpreter Toolkit

Toolkit uses E2B for secure code execution. Get an API key [here](https://e2b.dev/dashboard) and add it to your `.env`

```
E2B_API_KEY=<your API key>
```

#### 7.3) Memory Toolkit

Toolkit uses Mem0 for memory storage and retrieval. Get an API key [here](https://app.mem0.ai/dashboard/api-keys)

```
MEM0_API_KEY=<your API key>
```

#### 7.4) Image Toolkit

To use the Image Toolkit, you will need a key to **generate images** and a key to **store images**

We currently support OpenAI (get a key [here](https://platform.openai.com/settings/organization/api-keys)) and xAI (get a key [here](https://console.x.ai/)) image models.

> We are [looking for someone to add support for more image models](https://github.com/jasonhedman/toolkit.dev/issues/147)

```
# At least one of these is required for image gen
OPENAI_API_KEY=
XAI_API_KEY=
```

We use [Vercel Blob](https://vercel.com/docs/vercel-blob) for data storage

```
BLOB_READ_WRITE_TOKEN=<your token>
```

> We are [working on building a local mock of this SDK] so you dont have to get a key, but for now you will need to get a key from Vercel.

### 8) [OPTIONAL] Set up secondary data storage

#### 8.1) Resumable streams with Redis

Toolkit uses Redis to power resumable streams. If you want to enable this functionality, create a Redis instance and update your `.env`

```
REDIS_URL=<your Redis URL>
```

#### 8.2) Blob storage with Vercel Blob

If you want to be able to upload files, you will to be able to write to and read from Vercel Blob. More details on getting a key are [here](https://vercel.com/docs/vercel-blob)

```
BLOB_READ_WRITE_TOKEN=<your token>
```
