// tools/echo-tools.ts
import { z } from "zod";
import { ToolDefinition } from "../types/toolType.js";

export const echoTool: ToolDefinition = {
  name: "echo",
  description: "Echoes back the input message",
  inputSchema: z.object({
    message: z.string().describe("Message to echo back"),
  }),
};
