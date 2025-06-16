# Landing Page Components

This directory contains the main landing page components for the app, showcasing toolkit functionality and encouraging toolkit creation.

## Structure

### 1. HeroSection (`hero-section.tsx`)
- Features the main hero content with an animated toolkit demo conversation
- Uses `ToolkitDemoList` to show a realistic sequence of user messages and toolkit calls
- Demonstrates how multiple toolkits work together in practice
- Shows the complete flow: user input → tool execution → results → follow-up actions

### 2. ToolkitCreationSection (`toolkit-creation-section.tsx`) 
- Shows how easy it is to create custom toolkits
- Demonstrates the three-step process: Base Config → Server Logic → Client UI
- Uses real code examples from the toolkit creation system
- Aims to encourage developers to create their own toolkits

### 3. ToolkitSynergySection (`toolkit-synergy-section.tsx`)
- Emphasizes how toolkits can work together
- Similar to the starter prompts functionality
- Shows example workflows combining multiple toolkits
- Demonstrates the power of toolkit combinations

### 4. ToolkitDemoList (`toolkit-demo-list.tsx`)
- Animated list showing realistic toolkit interaction sequence
- Resembles the message UI from the chat interface
- Shows user messages, AI responses, and tool executions
- Demonstrates a real workflow: Research → Analysis → Visualization → Memory

## Usage

```tsx
import { LandingPage } from '@/app/_components/landing-page';

// Use the complete landing page
export default function HomePage() {
  return <LandingPage />;
}
```

Or import individual sections:

```tsx
import { 
  HeroSection, 
  ToolkitCreationSection, 
  ToolkitSynergySection,
  ToolkitDemoList 
} from '@/app/_components/landing-page/components';

export default function CustomPage() {
  return (
    <div>
      <HeroSection />
      {/* Your custom content */}
      <ToolkitCreationSection />
      <ToolkitSynergySection />
    </div>
  );
}
```

## Dependencies

- `@/toolkits/toolkits/client` - For accessing available toolkits
- `@/components/magicui/animated-list` - For the demo conversation animation
- `@/components/ui/logo` - For the AI assistant avatar
- Motion components for animations
- Various UI components (Card, Badge, Button, etc.)

## Key Features

- **Realistic Demo**: Shows actual toolkit interactions with proper message styling
- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Uses Framer Motion and AnimatedList for engaging animations  
- **Real Data**: Pulls actual toolkit information from the system
- **Message-like UI**: Resembles the actual chat interface users will experience
- **Dark Mode Support**: Proper theming for light/dark modes

## Demo Sequence

The `ToolkitDemoList` shows a realistic workflow:

1. **User**: "Research AI startup trends and analyze GitHub repositories"
2. **Exa Toolkit**: Searches for articles and trends
3. **GitHub Toolkit**: Analyzes trending repositories  
4. **Assistant**: Provides summary of findings
5. **User**: "Create visual summary and remember insights"
6. **Image Toolkit**: Generates infographic
7. **Memory Toolkit**: Stores key insights

This demonstrates the power of multi-toolkit collaboration in a realistic use case.