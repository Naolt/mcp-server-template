import { z } from "zod";

export type ToolName = "echo" | "other-tool";

export type ToolDefinition = {
  // name is enum of available tools
  name: ToolName;
  description: string;
  inputSchema: z.ZodSchema;
};
