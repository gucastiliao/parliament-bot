import IEventPayload from '../Types/IEventPayload';
import Response from "../Services/Response/ResponseService";

import Acidente from "../Dialogs/Acidente";
import Pane from "../Dialogs/Pane";
import PerguntaChamouPolicia from "../Dialogs/PerguntaChamouPolicia";

const acidente = new Acidente();
const pane = new Pane();
const perguntaChamouPolicia = new PerguntaChamouPolicia();

const textToExecuteMessageFunction = {
    'start_conversation': init,
    'INIT': init,
    'default': defaultMessage
};

function init(payload: IEventPayload, response: Response) {
    acidente.emit().with(payload, response).onEvent('sim');
    return response.sendUsing(payload);
}

function defaultMessage(payload: IEventPayload) {
    return payload.context.sendActivity('none');
}

function executeMessageWithText(text: string, payload: IEventPayload, response: Response): any {
    if (textToExecuteMessageFunction[text] !== undefined) {
        return textToExecuteMessageFunction[text](payload, response);
    }

    if (payload.state.currentDialog !== undefined) {
        //
    }

    return textToExecuteMessageFunction['default'](payload);
}

export default { executeMessageWithText };
