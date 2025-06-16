# Dynamic Starter Prompts System

## Overview

The dynamic starter prompts system revolutionizes how users discover and interact with the AI assistant by automatically adapting the suggested prompts based on which toolkits are currently selected. This intelligent system prioritizes prompts that can leverage the maximum number of available tools, showcasing the full potential of the platform.

## Key Features

### 🎯 **Smart Filtering**
- Prompts are dynamically filtered based on selected toolkits
- Only shows prompts that can be fully executed with available tools
- Fallback to generic prompts when no toolkits are selected

### 📊 **Intelligent Prioritization**
- Prompts that use MORE toolkits are prioritized over those using fewer
- Multi-toolkit prompts demonstrate maximum system capability
- Scoring system ensures optimal prompt selection

### 🔄 **Real-time Adaptation**
- Prompts update instantly when toolkits are added/removed
- Smooth animations provide visual feedback during transitions
- Maintains variety while prioritizing relevance

### 🎨 **Enhanced UX**
- Visual toolkit badges show which tools each prompt will use
- Hover effects reveal detailed descriptions
- Consistent with existing design patterns

## Available Toolkits

The system supports all current toolkits with their specialized capabilities:

| Toolkit | ID | Capabilities |
|---------|-----|-------------|
| **🔍 Search (Exa)** | `exa` | Web search, research papers, company analysis, LinkedIn/Wikipedia/GitHub search, crawling, competitor analysis |
| **🎨 Image Generation** | `image` | AI-powered image and infographic creation with multiple model options |
| **🐙 GitHub** | `github` | Repository search, code analysis, user discovery, organization insights |
| **📅 Google Calendar** | `google-calendar` | Calendar management, event scheduling, availability analysis |
| **📁 Google Drive** | `google-drive` | Document search, file analysis, content extraction |
| **🧠 Memory (Mem0)** | `memory` | Persistent context storage, conversation insights, user preference learning |
| **⚡ Code Execution (E2B)** | `e2b` | Secure Python execution, data analysis, visualization, algorithmic problem solving |

## Prompt Categories

### 🌟 **Multi-Toolkit Prompts** (Highest Priority)
These showcase the platform's maximum capability by combining 3+ toolkits:

```typescript
{
  content: "Research my competitors and create a comprehensive analysis with visual charts",
  toolkitIds: [Servers.Exa, Servers.Image, Servers.Memory],
  description: "Uses web search, image generation, and memory for comprehensive competitor analysis"
}
```

**Examples:**
- Competitor analysis with visual reports and memory storage
- GitHub repository analysis with architecture diagrams
- Research paper analysis with code execution and insights storage
- Calendar-based meeting scheduling with document preparation
- Data visualization dashboards from Drive files

### 🔧 **Two-Toolkit Prompts** (Medium Priority)
Smart combinations that leverage complementary capabilities:

```typescript
{
  content: "Analyze my calendar patterns and create a time management visualization",
  toolkitIds: [Servers.GoogleCalendar, Servers.Image],
  description: "Calendar analysis with visual insights"
}
```

**Examples:**
- Calendar + Image: Time management visualizations
- Search + Code: Research with practical experimentation
- GitHub + Memory: Code pattern recognition and storage
- Drive + Code: Document analysis with computational processing

### 🎯 **Single-Toolkit Prompts** (Fallback)
Focused prompts that showcase individual toolkit strengths:

```typescript
{
  content: "Search for the latest developments in artificial intelligence and machine learning",
  toolkitIds: [Servers.Exa],
  description: "Comprehensive web research and information gathering"
}
```

### 🌐 **Generic Prompts** (No Toolkits Required)
Universal prompts for when no toolkits are selected:

```typescript
{
  content: "Help me brainstorm creative ideas for my project",
  toolkitIds: [],
  description: "General creative assistance and ideation"
}
```

## Technical Implementation

### Core Algorithm

```typescript
// 1. Get selected toolkits
const selectedToolkitIds = new Set(toolkits.map(t => t.id as Servers));

// 2. Score prompts based on toolkit usage
const scoredPrompts = DYNAMIC_STARTER_PROMPTS
  .map(prompt => {
    const matchingToolkits = prompt.toolkitIds.filter(id => 
      selectedToolkitIds.has(id)
    ).length;
    
    const totalRequired = prompt.toolkitIds.length;
    
    // Only include if ALL required toolkits are available
    if (totalRequired === 0 || matchingToolkits === totalRequired) {
      return {
        ...prompt,
        score: matchingToolkits, // Higher score = more toolkit usage
        matchingToolkits
      };
    }
    
    return null;
  })
  .filter(Boolean);

// 3. Sort by score (descending) and ensure variety
scoredPrompts.sort((a, b) => b.score - a.score);
```

### Key Benefits

1. **🚀 Maximum Capability Showcase**: Users immediately see what's possible with their selected tools
2. **⚡ Intelligent Discovery**: Prompts adapt to available capabilities, reducing confusion
3. **🎨 Enhanced User Experience**: Visual indicators and smooth transitions
4. **📈 Scalable Architecture**: Easy to add new toolkits and prompts
5. **🔄 Real-time Adaptation**: Instant updates when toolkit selection changes

## Adding New Prompts

To add new starter prompts, simply extend the `DYNAMIC_STARTER_PROMPTS` array:

```typescript
{
  content: "Your creative prompt here",
  toolkitIds: [Servers.ToolkitA, Servers.ToolkitB], // Required toolkits
  description: "Brief description of what this prompt does"
}
```

### Best Practices for New Prompts

1. **🎯 Be Specific**: Clear, actionable prompts work best
2. **🔧 Leverage Synergies**: Combine toolkits that complement each other
3. **📝 Provide Context**: Include helpful descriptions
4. **🎨 Think Visually**: Consider how toolkits can work together creatively
5. **🚀 Show Maximum Value**: Demonstrate the full potential of multiple tools

## Examples by Toolkit Combination

### 🔍 + 🎨 + 🧠 (Search + Image + Memory)
- "Research industry trends, generate infographics, and remember key insights"
- "Analyze competitors, create visual comparisons, and store findings"

### 🐙 + ⚡ + 🎨 (GitHub + Code + Image)  
- "Analyze repository architecture and generate technical diagrams"
- "Review code quality and create visual reports"

### 📅 + 📁 + 🧠 (Calendar + Drive + Memory)
- "Schedule meetings based on document context and remember preferences"
- "Analyze meeting patterns from calendar and documents"

### 🔍 + ⚡ (Search + Code)
- "Research algorithms and implement working examples"
- "Find datasets and perform statistical analysis"

## Future Enhancements

- **🏷️ Prompt Tagging**: Add categories like "productivity", "research", "creative"
- **👤 Personalization**: Learn user preferences and suggest relevant prompts
- **📊 Analytics**: Track prompt usage to optimize the selection
- **🔗 Context Awareness**: Suggest prompts based on conversation history
- **🎛️ Customization**: Allow users to create and save custom prompts

## Migration from Static System

The old static system has been completely replaced with this dynamic approach:

**Before:**
```typescript
const STARTER_PROMPTS = [
  "Help me write a professional email",
  "Explain a complex topic simply",
  // ... static list
];
```

**After:**
```typescript
interface StarterPrompt {
  content: string;
  toolkitIds: Servers[];
  description?: string;
}

const DYNAMIC_STARTER_PROMPTS: StarterPrompt[] = [
  // ... intelligent, toolkit-aware prompts
];
```

This new system provides:
- ✅ **Better Discovery**: Users see relevant capabilities
- ✅ **Reduced Confusion**: Only actionable prompts are shown  
- ✅ **Maximum Value**: Showcases multi-toolkit workflows
- ✅ **Future-Proof**: Easy to extend with new toolkits

---

*The dynamic starter prompts system represents a significant leap forward in AI assistant user experience, automatically adapting to show users the most relevant and powerful capabilities available to them at any given moment.*