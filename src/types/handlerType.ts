import { ToolName } from "./toolType.js";

export type HandlerResponse = {
  content: {
    type: "text" | "json";
    text?: string;
    json?: any;
  }[];
  isError: boolean;
};

export type Handler = (input: any) => Promise<HandlerResponse>;

export type Handlers = {
  [K in ToolName]?: Handler;
};
