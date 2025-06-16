# Landing Page Components

This directory contains the main landing page components for the app, showcasing toolkit functionality and encouraging toolkit creation.

## Structure

### 1. HeroSection (`hero-section.tsx`)
- Features the main hero content with animated toolkit cards
- Uses `AnimatedBeam` components to connect toolkit cards to the central logo
- Displays all available toolkits from `clientToolkits` in a circular layout
- Includes call-to-action buttons and main value proposition

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
  ToolkitSynergySection 
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
- `@/components/magicui/animated-beam` - For animated connections
- `@/components/ui/logo` - For the central logo
- Motion components for animations
- Various UI components (Card, Badge, Button, etc.)

## Key Features

- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Uses Framer Motion for engaging animations  
- **Real Data**: Pulls actual toolkit information from the system
- **Interactive Elements**: Hover effects and animated beams
- **Dark Mode Support**: Proper theming for light/dark modes