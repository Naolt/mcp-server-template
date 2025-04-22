import { echoHandler } from "./echo-handler.js";
import { Handlers } from "../types/handlerType.js";
export * from "./echo-handler.js";

export const handlers: Handlers = {
  echo: echoHandler,
};
