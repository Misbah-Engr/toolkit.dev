import { clientToolkits } from "@/toolkits/toolkits/client";
import { PrismaClient } from "@prisma/client";
import type { Message } from "ai";

const prisma = new PrismaClient();

// Define all available tools from each toolkit
const ALL_TOOLS = Object.entries(clientToolkits).reduce(
  (acc, [toolkitName, toolkit]) => {
    return {
      ...acc,
      [toolkitName]: {
        name: toolkit.name,
        tools: Object.keys(toolkit.tools),
      },
    };
  },
  {} as Record<string, { name: string; tools: string[] }>,
);

async function main() {
  console.log("🔧 Creating toolkits and tools...");

  const tools = await prisma.tool.findMany({});

  if (tools.length > 0) {
    console.log("🔍 Found existing tools, skipping creation...");
    return;
  }

  // Clear existing data
  await prisma.tool.deleteMany({});
  await prisma.toolkit.deleteMany({});

  // Create toolkits and tools
  const toolkitMap = new Map<string, string>(); // toolkit name -> toolkit id

  for (const [toolkitName, { tools }] of Object.entries(ALL_TOOLS)) {
    // Create toolkit
    const toolkit = await prisma.toolkit.create({
      data: {
        id: toolkitName,
      },
    });

    toolkitMap.set(toolkitName, toolkit.id);

    // Create tools for this toolkit
    const toolData = tools.map((toolName) => ({
      id: toolName,
      toolkitId: toolkit.id,
    }));

    await prisma.tool.createMany({
      data: toolData,
    });
  }

  console.log(
    `✅ Created ${Object.keys(ALL_TOOLS).length} toolkits with ${Object.values(ALL_TOOLS).flat().length} tools`,
  );

  // Now read messages and update with actual usage
  console.log("🔍 Reading all messages to aggregate tool usage...");

  const messages = await prisma.message.findMany({
    where: {
      role: "assistant", // Only assistant messages can have tool invocations
    },
    select: {
      id: true,
      parts: true,
      createdAt: true,
    },
  });

  console.log(`📊 Found ${messages.length} assistant messages to analyze`);

  // Track tool usage
  const toolUsageMap = new Map<string, number>();

  let totalToolInvocations = 0;
  let messagesWithTools = 0;

  // Process each message
  for (const message of messages) {
    const parts = message.parts as unknown as Message["parts"];
    let messageHasTools = false;

    if (!parts) {
      continue;
    }

    // Look for tool-invocation parts
    for (const part of parts) {
      if (part.type === "tool-invocation" && part.toolInvocation) {
        const { toolName } = part.toolInvocation;

        // Parse toolkit and tool from toolName (format: "toolkit_tool")
        const [toolkit, tool] = toolName.split("_");

        if (toolkit && tool) {
          const key = `${toolkit}_${tool}`;
          toolUsageMap.set(key, (toolUsageMap.get(key) ?? 0) + 1);
          totalToolInvocations++;
          messageHasTools = true;
        } else {
          console.warn(`⚠️  Invalid tool name format: ${toolName}`);
        }
      }
    }

    if (messageHasTools) {
      messagesWithTools++;
    }
  }

  console.log(
    `📈 Found ${totalToolInvocations} tool invocations across ${messagesWithTools} messages`,
  );
  console.log(`🔧 Unique tool combinations found: ${toolUsageMap.size}`);
  // Update the database with actual usage data
  console.log("💾 Updating tool usage data with actual counts...");

  const updatePromises = Array.from(toolUsageMap.entries()).map(
    async ([key, count]) => {
      const [toolkitName, toolName] = key.split("_");

      if (toolkitName && toolName) {
        const toolkitId = toolkitMap.get(toolkitName);
        if (toolkitId) {
          return prisma.tool.updateMany({
            where: {
              id: toolName,
              toolkitId: toolkitId,
            },
            data: {
              usageCount: count,
            },
          });
        }
      }
    },
  );

  await Promise.all(updatePromises.filter(Boolean));

  console.log("✅ Tool usage data updated!");

  // Get final results for reporting
  const finalResults = await prisma.tool.findMany({
    include: {
      toolkit: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      usageCount: "desc",
    },
  });

  // Log top 10 most used tools
  console.log("\n🏆 Top 10 most used tools:");
  finalResults.slice(0, 10).forEach((tool, index) => {
    console.log(
      `${index + 1}. ${tool.toolkit.id}/${tool.id}: ${tool.usageCount} uses`,
    );
  });

  // Aggregate by toolkit
  const toolkitUsage = new Map<string, number>();
  finalResults.forEach(({ toolkit, usageCount }) => {
    toolkitUsage.set(
      toolkit.id,
      (toolkitUsage.get(toolkit.id) ?? 0) + usageCount,
    );
  });

  console.log("\n📦 Toolkit usage summary:");
  Array.from(toolkitUsage.entries())
    .sort(([, a], [, b]) => b - a)
    .forEach(([toolkit, totalUsage]) => {
      console.log(`  ${toolkit}: ${totalUsage} total uses`);
    });

  // Show tools with zero usage
  const zeroUsageTools = finalResults.filter((tool) => tool.usageCount === 0);
  console.log(
    `\n📊 Tools with zero usage: ${zeroUsageTools.length}/${finalResults.length}`,
  );

  console.log("\n🎉 Tool usage aggregation complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error aggregating tool usage:", e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
