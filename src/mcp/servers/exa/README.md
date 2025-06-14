# Exa MCP Server Implementation

This implementation provides all the tools from the official exa-mcp-server, enabling comprehensive AI-powered search capabilities.

## Available Tools

### 1. **Search** (`search`)
- **Description**: General web search for up-to-date information
- **Input**: `query` (string)
- **Use Case**: Real-time web searches with optimized results

### 2. **Research Paper Search** (`research_paper_search`)
- **Description**: Specialized search focused on academic papers and research content
- **Input**: `query` (string)
- **Use Case**: Finding academic papers from arXiv, Google Scholar, PubMed, ResearchGate, IEEE, ACM
- **Features**: Searches across academic domains for research papers

### 3. **Company Research** (`company_research`)
- **Description**: Comprehensive company research tool that gathers detailed business information
- **Input**: `company` (string)
- **Use Case**: Business intelligence, due diligence, market research
- **Features**: Enhanced content length (1500 chars), neural search with autoprompt

### 4. **Crawling** (`crawling`)
- **Description**: Extracts content from specific URLs
- **Input**: `url` (URL string)
- **Use Case**: Reading articles, PDFs, or any web page when you have the exact URL
- **Features**: Direct content extraction using Exa's getContents API

### 5. **Competitor Finder** (`competitor_finder`)
- **Description**: Identifies competitors of a company
- **Input**: `company` (string)
- **Use Case**: Competitive analysis, market positioning
- **Features**: Searches for businesses offering similar products or services

### 6. **LinkedIn Search** (`linkedin_search`)
- **Description**: Search LinkedIn for companies and people
- **Input**: `query` (string)
- **Use Case**: Professional networking, recruitment, business development
- **Features**: Limited to linkedin.com domain for accurate results

### 7. **Wikipedia Search** (`wikipedia_search_exa`)
- **Description**: Search Wikipedia articles on specific topics
- **Input**: `query` (string)
- **Use Case**: Fact-checking, research, general knowledge
- **Features**: Enhanced content length (1500 chars), limited to wikipedia.org

### 8. **GitHub Search** (`github_search`)
- **Description**: Search GitHub repositories and accounts
- **Input**: `query` (string)
- **Use Case**: Code discovery, developer research, project analysis
- **Features**: 5 results, limited to github.com domain

## Configuration

### Server Configuration
All tools are configured in `src/mcp/servers/exa/server.ts` with appropriate Exa API integrations.

### Client Configuration
Each tool has a custom React component for displaying results with appropriate icons and styling:
- Research papers use BookOpen icon
- Company research uses Building icon
- Crawling uses Link icon
- Competitor finder uses Users icon
- LinkedIn uses Linkedin icon
- Wikipedia uses Globe icon
- GitHub uses Github icon

### Environment Variables
Requires `EXA_API_KEY` to be set in your environment configuration.

## Usage Examples

```typescript
// Research papers
await exa.searchAndContents(query, {
  livecrawl: "always",
  numResults: 3,
  includeDomains: ["arxiv.org", "scholar.google.com", "pubmed.ncbi.nlm.nih.gov"]
});

// Company research
await exa.searchAndContents(`${company} company profile business information`, {
  livecrawl: "always", 
  numResults: 5,
  type: "neural",
  useAutoprompt: true
});

// URL crawling
await exa.getContents([url]);
```

## Features

- **Specialized Search**: Each tool is optimized for specific use cases
- **Domain Filtering**: Tools use appropriate domain restrictions for accuracy
- **Enhanced Content**: Longer content extracts for research and business tools
- **Neural Search**: Advanced search capabilities for company research
- **Visual Feedback**: Custom UI components for each tool type
- **Error Handling**: Comprehensive error handling and user feedback

## File Structure

```
src/mcp/servers/exa/
├── base.ts                           # Main toolkit configuration
├── server.ts                         # Server implementations
├── client.tsx                        # Client configurations
├── tools/
│   ├── tools.ts                      # Tool enum definitions
│   ├── search/                       # General web search
│   ├── research_paper_search/        # Academic paper search
│   ├── company_research/             # Business research
│   ├── crawling/                     # URL content extraction
│   ├── competitor_finder/            # Competitive analysis
│   ├── linkedin_search/              # Professional networking
│   ├── wikipedia_search/             # Encyclopedia search
│   └── github_search/                # Code repository search
```

Each tool directory contains:
- `base.ts` - Schema definitions
- `server.ts` - Exa API integration
- `client.tsx` - React UI components