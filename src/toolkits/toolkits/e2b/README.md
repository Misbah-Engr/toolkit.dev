# E2B Python Code Execution Toolkit

This toolkit provides secure Python code execution capabilities using E2B's sandboxed environment. It allows users to run Python code safely with full package support and returns execution results, output logs, and error information.

## Features

- **Secure Execution**: Code runs in isolated E2B sandbox environments
- **Full Python Support**: Access to popular Python packages and libraries
- **Jupyter Notebook Syntax**: Supports notebook-style code execution
- **Rich Output**: Returns execution results, stdout, and stderr logs
- **Beautiful UI**: Syntax highlighting and organized result display

## Setup

### 1. Install Dependencies

```bash
npm install @e2b/code-interpreter
```

### 2. Environment Variables

Add your E2B API key to your environment variables:

```bash
E2B_API_KEY=your_e2b_api_key_here
```

You can get an API key from [E2B's website](https://e2b.dev).

### 3. Integration

The toolkit is automatically available once properly configured. No additional setup required.

## Usage

### Tool: `run-code`

Executes Python code in a secure sandbox environment.

**Input:**
- `code` (string): The Python code to execute

**Output:**
- `results` (array): Execution results from the code
- `logs` (object): Contains `stdout` and `stderr` arrays with output logs

**Example:**
```python
import matplotlib.pyplot as plt
import numpy as np

# Create sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create plot
plt.figure(figsize=(10, 6))
plt.plot(x, y)
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.show()
```

## Architecture

The toolkit follows the standard toolkit pattern:

```
e2b/
├── base.ts              # Base toolkit configuration
├── client.tsx           # Client-side UI components
├── server.ts            # Server-side business logic
├── tools/
│   ├── tools.ts         # Tool enum definitions
│   └── run_code/
│       ├── base.ts      # Tool schema definitions
│       ├── client.tsx   # UI components
│       └── server.ts    # Execution logic
└── README.md           # This file
```

## Security

- All code execution happens in isolated E2B sandbox environments
- No access to the host system or user data
- Automatic cleanup of sandbox resources after execution
- Secure handling of execution results and logs

## Error Handling

The toolkit includes comprehensive error handling for:
- Missing E2B API key
- Package installation failures
- Code execution errors
- Sandbox creation/cleanup issues

## UI Components

### CallComponent
Displays the code being executed with syntax highlighting.

### ResultComponent
Shows execution results in an organized format:
- **Results**: JSON-formatted execution results
- **Output**: Standard output logs
- **Errors**: Error logs with appropriate styling
- **Actions**: Button to run more code

## Dependencies

- `@e2b/code-interpreter`: E2B's code execution package
- `react-syntax-highlighter`: Code syntax highlighting
- `lucide-react`: Icons
- UI components from the project's component library

## Troubleshooting

### "Package not installed" error
Run `npm install @e2b/code-interpreter` to install the required package.

### "API key not set" error
Ensure `E2B_API_KEY` environment variable is properly configured.

### Execution timeouts
E2B sandboxes have execution time limits. Consider breaking long-running code into smaller chunks.