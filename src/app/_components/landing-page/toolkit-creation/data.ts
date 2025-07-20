export const agentWorkflowExamples = [
  {
    id: "simple",
    title: "Simple Agent Workflow",
    description: "Create a basic AI agent workflow with multiple agents.",
    code: `import { Swarm, Agent } from 'ai-agent-sdk';

const client = new Swarm();

const transferToAgentB = (): Agent => {
  return agentB;
};

const agentA = new Agent({
  name: "Agent A",
  instructions: "You are a helpful agent.",
  functions: [transferToAgentB],
});

const agentB = new Agent({
  name: "Agent B",
  instructions: "Only speak in Haikus.",
});

const run = async () => {
  const response = await client.run({
    agent: agentA,
    messages: [{ role: "user", content: "I want to talk to agent B" }],
  });
  console.log('Response:', response);
};

run();`,
  },
  {
    id: "collaboration",
    title: "Multi-Agent Collaboration",
    description: "Set up multiple AI agents to work together on a complex task.",
    code: `import { Agent, MultiAgentSystem } from 'ai-agent-sdk';

const researchAgent = new Agent('Researcher');
const analysisAgent = new Agent('Analyst');
const reportAgent = new Agent('Reporter');

const system = new MultiAgentSystem('MarketResearch');

system.addAgent(researchAgent, {
  task: 'collectData',
  output: 'rawData'
});

system.addAgent(analysisAgent, {
  task: 'analyzeData',
  input: 'rawData',
  output: 'analysisResults'
});

system.addAgent(reportAgent, {
  task: 'generateReport',
  input: 'analysisResults',
  output: 'finalReport'
});

const runResearch = async () => {
  const finalReport = await system.run();
  console.log('Research completed:', finalReport);
};`,
  },
  {
    id: "tool-integration",
    title: "Tool Integration",
    description: "Integrate external tools and APIs into an AI agent workflow.",
    code: `import { Agent, Tool } from 'ai-agent-sdk';
import { SearchAPI, DatabaseAPI, EmailAPI } from './external-apis';

const searchTool = new Tool({
  name: 'search',
  description: 'Search the web for information',
  function: async (query) => {
    return await SearchAPI.search(query);
  }
});

const databaseTool = new Tool({
  name: 'database',
  description: 'Store and retrieve data',
  function: async (data) => {
    return await DatabaseAPI.store(data);
  }
});

const agent = new Agent({
  name: 'Research Assistant',
  instructions: 'You help users research topics',
  tools: [searchTool, databaseTool],
});

const result = await agent.run({
  message: 'Research AI agent frameworks',
  context: { userId: '123' }
});`,
  },
  {
    id: "customizable",
    title: "Customizable Agent Behavior",
    description: "Design a specialized AI agent with custom decision-making logic.",
    code: `import { Agent, DecisionEngine } from 'ai-agent-sdk';

class CustomDecisionEngine extends DecisionEngine {
  async decide(context, options) {
    // Custom logic for decision making
    if (context.urgency === 'high') {
      return options.priorityPath;
    }
    
    if (context.userPreference === 'detailed') {
      return options.detailedPath;
    }
    
    return options.defaultPath;
  }
}

const customAgent = new Agent({
  name: 'Smart Assistant',
  instructions: 'Adapt behavior based on context',
  decisionEngine: new CustomDecisionEngine(),
  personality: {
    tone: 'professional',
    helpfulness: 'high',
    verbosity: 'adaptive'
  },
  learningMode: true,
});

const response = await customAgent.process({
  input: 'Help me plan my day',
  context: { urgency: 'medium', userPreference: 'concise' }
});`,
  },
];
