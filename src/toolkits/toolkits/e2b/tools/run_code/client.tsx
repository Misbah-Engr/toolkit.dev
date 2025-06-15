import { type CreateMessage } from "ai";
import { type ClientToolConfig } from "@/toolkits/types";
import { type baseRunCodeTool } from "./base";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Play, Terminal, AlertCircle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CallComponent: React.FC<{
  args: { code: string };
}> = ({ args }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Play className="h-4 w-4" />
          Running Python Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Code to Execute:</span>
          </div>
          <SyntaxHighlighter
            language="python"
            style={oneDark}
            className="rounded-md text-sm"
            customStyle={{
              margin: 0,
              padding: '12px',
              fontSize: '13px',
            }}
          >
            {args.code}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
};

const ResultComponent: React.FC<{
  result: {
    results: unknown[];
    logs: {
      stdout: string[];
      stderr: string[];
    };
  };
  append: (message: CreateMessage) => void;
}> = ({ result, append }) => {
  const hasResults = result.results && result.results.length > 0;
  const hasStdout = result.logs.stdout.length > 0;
  const hasStderr = result.logs.stderr.length > 0;

  const runMore = () => {
    append({
      role: "user",
      content: "Run more Python code for me.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Terminal className="h-4 w-4" />
          Execution Results
          <Badge variant="outline" className="ml-auto">
            E2B Sandbox
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasResults && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Results:</span>
            </div>
            <div className="bg-muted rounded-md p-3">
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                className="rounded-md text-sm"
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: 'transparent',
                  fontSize: '13px',
                }}
              >
                {JSON.stringify(result.results, null, 2)}
              </SyntaxHighlighter>
            </div>
          </div>
        )}

        {hasStdout && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Output:</span>
            </div>
            <div className="bg-muted rounded-md p-3">
              <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                {result.logs.stdout.join('\n')}
              </pre>
            </div>
          </div>
        )}

        {hasStderr && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Errors:</span>
            </div>
            <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-3">
              <pre className="text-sm whitespace-pre-wrap text-red-700 dark:text-red-400">
                {result.logs.stderr.join('\n')}
              </pre>
            </div>
          </div>
        )}

        {!hasResults && !hasStdout && !hasStderr && (
          <div className="text-center py-4 text-muted-foreground">
            <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Code executed successfully with no output</p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button variant="outline" size="sm" onClick={runMore} className="gap-2">
            <Play className="h-3 w-3" />
            Run More Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const e2bRunCodeToolConfigClient: ClientToolConfig<
  typeof baseRunCodeTool.inputSchema.shape,
  typeof baseRunCodeTool.outputSchema.shape
> = {
  CallComponent,
  ResultComponent,
};