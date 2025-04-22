#!/usr/bin/env node
import "dotenv/config";
import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { config } from "./config.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { logger } from "./logger.js";
import { handlers } from "./handlers/index.js";
import { ToolName } from "./types/toolType.js";
import { Config } from "./types/configType.js";

export class McpServer {
  private server: Server;
  private transports: Record<string, SSEServerTransport> = {};

  constructor(config: Config) {
    this.server = new Server(
      { name: config.server.name, version: config.server.version },
      { capabilities: { tools: {} } }
    );
    this.setupToolHandlers();
    this.server.onerror = console.error;
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      logger.info(`[Request] ${name} Arguments: ${JSON.stringify(args)}`);

      const handler = handlers[name as ToolName];
      if (!handler) {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }

      try {
        return await handler(args);
      } catch (error: any) {
        logger.error(
          `[Error] Failed to process request for ${name}: ${error.message}`
        );
        throw new McpError(ErrorCode.InternalError, `Error: ${error.message}`);
      }
    });
  }

  async run() {
    const app = express();

    app.get("/sse", async (_, res) => {
      logger.info("Establishing SSE connection");
      const transport = new SSEServerTransport("/messages", res);
      this.transports[transport.sessionId] = transport;
      res.on("close", () => delete this.transports[transport.sessionId]);
      await this.server.connect(transport);
      logger.info("SSE connection established");
    });

    app.post("/messages", async (req, res) => {
      const transport = this.transports[req.query.sessionId as string];
      if (transport) await transport.handlePostMessage(req, res);
      else res.status(400).send("No transport");
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`[${config.server.name}] Listening on port ${port}`)
    );
  }
}

const server = new McpServer(config);
server.run();
