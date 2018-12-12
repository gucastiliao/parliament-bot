import { TurnContext } from "botbuilder";
import IConversationState from "./IConversationState";

interface IEventPayload {
  context: TurnContext;
  state: IConversationState;
  response?: any;
}

export default IEventPayload;
