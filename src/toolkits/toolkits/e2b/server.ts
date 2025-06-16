import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseE2BToolkitConfig } from "./base";
import { e2bRunCodeToolConfigServer } from "./tools/run_code/server";
import { E2BTools } from "./tools/tools";

export const e2bToolkitServer = createServerToolkit(
  baseE2BToolkitConfig,
  `You have access to the E2B toolkit for secure code execution and development environments. This toolkit provides:

- **Run Code**: Execute code in isolated, secure cloud environments with support for multiple programming languages

**Tool Usage Guidelines:**
1. **Code Execution**: Use Run Code to execute scripts, test code snippets, or run computational tasks in a secure environment
2. **Development Support**: Run code to test solutions, validate algorithms, or demonstrate programming concepts
3. **Data Processing**: Execute code for data analysis, file processing, or computational tasks that require a runtime environment

**Best Practices:**
- Provide clear, well-structured code for execution
- Include necessary imports and dependencies in your code
- Use appropriate programming languages for the task at hand
- Handle errors gracefully and provide informative error messages
- Consider security implications and avoid executing potentially harmful code
- Use for educational purposes, testing, or demonstrating code functionality

This toolkit enables safe code execution without requiring local development environments, making it perfect for testing, learning, and development assistance.`,
  async () => {
    return {
      [E2BTools.RunCode]: e2bRunCodeToolConfigServer(),
    };
  },
);
