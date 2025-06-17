# OpenChat 🚀

An extensible AI chat application built for the **T3 Cloneathon** using the [T3 Stack](https://create.t3.gg/). OpenChat features a powerful toolkit system that allows AI assistants to interact with external services, search the web, manage files, and much more.

## ✨ Features

### 🤖 **Multiple LLM Providers**
- **OpenAI** (GPT-3.5, GPT-4, GPT-4o, etc.)
- **Anthropic** (Claude 3.5 Sonnet, Claude 3 Opus, etc.)
- **XAI** (Grok models)
- **Google** (Gemini Pro, Gemini Flash)
- **Perplexity** (Various models)

Choose any LLM provider - the app automatically adapts to your configuration!

### 🔐 **Flexible Authentication**
- **Discord** OAuth
- **Google** OAuth  
- **GitHub** OAuth
- **Twitter** OAuth
- **Notion** OAuth

Just configure one auth provider and you're ready to go!

### 🛠️ **Extensible Toolkit System**
OpenChat's toolkit architecture allows AI assistants to use powerful tools:

#### **Web Search & Research**
- **Exa Search** - Neural web search with multiple specialized tools:
  - General web search
  - Academic paper search
  - Company research
  - Competitor analysis
  - LinkedIn search
  - Wikipedia search
  - GitHub search
  - Web crawling

#### **Development & Code**
- **GitHub Integration** - Repository management, issue tracking, code search
- **E2B** - Code execution in secure sandboxes

#### **Productivity & Knowledge**
- **Google Calendar** - Event management and scheduling
- **Google Drive** - File management and document access
- **Notion** - Database queries and page management
- **Memory (Mem0)** - Persistent memory for conversations

#### **Media & Content**
- **Image Processing** - Advanced image analysis and manipulation

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Real-time chat interface
- Interactive tool result displays
- Loading states and progress indicators
- Dark/light mode support

### 🔒 **Security & Type Safety**
- Server-side API key management
- Type-safe API calls with tRPC
- Zod schema validation
- Secure authentication flow

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **pnpm** (recommended) or npm
- **Database** (PostgreSQL recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/open-chat.git
cd open-chat
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env
```

#### Required Configuration

**Database:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/openchat"
```

**App Configuration:**
```env
APP_URL="http://localhost:3000"
AUTH_SECRET="your-secret-key"  # Generate with: openssl rand -base64 32
NODE_ENV="development"
```

#### Choose One Authentication Provider

**Option 1: Discord**
```env
AUTH_DISCORD_ID="your-discord-client-id"
AUTH_DISCORD_SECRET="your-discord-client-secret"
```

**Option 2: Google**
```env
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

**Option 3: GitHub**
```env
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

**Option 4: Twitter**
```env
AUTH_TWITTER_ID="your-twitter-client-id"
AUTH_TWITTER_SECRET="your-twitter-client-secret"
```

**Option 5: Notion**
```env
AUTH_NOTION_ID="your-notion-client-id"
AUTH_NOTION_SECRET="your-notion-client-secret"
```

#### Choose One LLM Provider

**Option 1: OpenAI**
```env
OPENAI_API_KEY="sk-your-openai-key"
```

**Option 2: Anthropic**
```env
ANTHROPIC_API_KEY="sk-ant-your-anthropic-key"
```

**Option 3: XAI**
```env
XAI_API_KEY="your-xai-key"
```

**Option 4: Google**
```env
GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-key"
```

**Option 5: Perplexity**
```env
PERPLEXITY_API_KEY="your-perplexity-key"
```

#### Optional Toolkit API Keys

Enable specific toolkits by adding their API keys:

```env
# Web Search
EXA_API_KEY="your-exa-key"

# Memory
MEM0_API_KEY="your-mem0-key"

# Code Execution
E2B_API_KEY="your-e2b-key"
```

> **Note:** The app automatically detects which providers and toolkits are configured and adapts the interface accordingly!

### 4. Database Setup

Run database migrations:
```bash
pnpm db:push
```

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your OpenChat instance!

## 🏗️ Built With the T3 Stack

OpenChat leverages the full power of the T3 Stack:

- **[Next.js](https://nextjs.org)** - React framework with App Router
- **[NextAuth.js](https://next-auth.js.org)** - Authentication solution
- **[Prisma](https://prisma.io)** - Database ORM and migrations
- **[Drizzle](https://orm.drizzle.team)** - Type-safe database queries
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[tRPC](https://trpc.io)** - End-to-end type-safe APIs

Plus additional tools:
- **[Zod](https://zod.dev)** - Schema validation
- **[Lucide React](https://lucide.dev)** - Icon library
- **[AI SDK](https://sdk.vercel.ai)** - AI model integration

## 🛠️ Development

### Adding New Toolkits

OpenChat's modular architecture makes it easy to add new toolkits. Check out the [Toolkit Development Guide](./src/toolkits/README.md) for detailed instructions.

### Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                 # Utility functions
├── server/             # tRPC server and database
├── toolkits/           # Extensible toolkit system
└── env.js              # Environment validation
```

### Database Commands

```bash
# Push schema changes
pnpm db:push

# Generate Prisma client
pnpm db:generate

# Open database studio
pnpm db:studio
```

## 🎯 T3 Cloneathon

This project was built for the T3 Cloneathon, showcasing:

- **Modern T3 Stack** usage with latest patterns
- **Type Safety** throughout the entire application
- **Scalable Architecture** with the toolkit system
- **Developer Experience** with comprehensive tooling
- **Production Ready** with proper error handling and validation

## 🤝 Contributing

Contributions are welcome! Please read our [Toolkit Development Guide](./src/toolkits/README.md) to get started with creating new toolkits.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **T3 Stack** team for the amazing developer experience
- **Vercel** for the AI SDK and hosting platform
- **OpenAI**, **Anthropic**, and other LLM providers
- **T3 Cloneathon** organizers and community

---

Built with ❤️ for the T3 Cloneathon
