import Response from "../Services/Response/ResponseService";
import DefaultDialog from "./DefaultDialog";

import IEventPayload from '../Types/IEventPayload';

class ColetaCpfCnpj extends DefaultDialog {
    constructor() {
        const audios = [
            {
                src: "INIT_01",
                text: "Olá, digite o CPF ou CNPJ",
            }
        ];

        super('coletaCpfCnpj', audios);
    }

    public eventDigitou(payload: IEventPayload, response: Response) {
        payload.state.cpfCnpj = payload.context.activity.text;
        this.updatePayload(payload, 'digitou');
        this.emit('coletaPlaca').with(payload, response).onEvent('init');
    }
}

export default ColetaCpfCnpj;