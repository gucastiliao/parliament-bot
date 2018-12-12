import { TurnContext } from "botbuilder";

interface IEventPayload {
  context: TurnContext;
  state: {};
  response?: any;
}

export default IEventPayload;
