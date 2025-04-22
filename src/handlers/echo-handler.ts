// handlers/echoHandlers.ts
import { HandlerResponse } from "../types/handlerType.js";

export const echoHandler = async ({
  message,
}: {
  message: string;
}): Promise<HandlerResponse> => {
  return {
    content: [{ type: "text", text: `Echo: ${message}` }],
    isError: false,
  };
};
