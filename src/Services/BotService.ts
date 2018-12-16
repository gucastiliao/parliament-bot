import IEventPayload from '../Types/IEventPayload';
import Response from "./Response/ResponseService";

import ColetaCpfCnpj from "../Dialogs/ColetaCpfCnpj";
const coletaCpfCnpj = new ColetaCpfCnpj();

class BotService {
    private textToExecuteMessageFunction: Object = {
        'start_conversation': this.init,
        'init': this.init,
        'default': this. defaultMessage
    };

    public init(payload: IEventPayload, response: Response) {
        coletaCpfCnpj.emit().with(payload, response).onEvent('init');
        return response.sendUsing(payload);
    }

    public defaultMessage(payload: IEventPayload) {
        return payload.context.sendActivity('none');
    }

    public executeMessageWithText(text: string, payload: IEventPayload, response: Response): any {
        if (this.textToExecuteMessageFunction[text.toLowerCase()] !== undefined) {
            return this.textToExecuteMessageFunction[text.toLowerCase()](payload, response);
        }
    
        if (payload.state.currentDialog !== undefined) {
            //
        }
    
        return this.textToExecuteMessageFunction['default'](payload);
    }
}

export default BotService;
