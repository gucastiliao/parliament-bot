import * as restify from "restify";
import { BotFrameworkAdapter, ConversationState } from "botbuilder";

import RedisStorage from "./Services/RedisStorageService";
import Response from "./Services/Response/ResponseService";
import BotService from "./Services/BotService";

import IConversationState from "./Types/IConversationState";

const server = restify.createServer();
server.listen(process.env.SERVER_PORT || '4500', '0.0.0.0', () => {
    console.log(`${server.name} listening to ${server.url}`);
});

const adapter = new BotFrameworkAdapter();

const conversationState = new ConversationState<IConversationState>(new RedisStorage());
adapter.use(conversationState);

server.get('/', (req, resp) => {resp.send(200)});

server.post("/api/messages", (req, res) => {
    try {
        adapter.processActivity(req, res, async context => {
            if (context.activity.type === "message") {
                const state = conversationState.get(context);
                const response = new Response();
                const botService = new BotService();

                const message = botService.executeMessageWithText(
                    context.activity.text,
                    { context, state },
                    response
                );

                return message;
            }
        });
    } catch (error) {
        console.log(error);
    }
});
