import Response from "../Services/Response/ResponseService";
import DefaultDialog from "./DefaultDialog";

import IEventPayload from '../Types/IEventPayload';

class ColetaCpfCnpj extends DefaultDialog {
    constructor() {
        const audios = [
            {
                src: "INI_01",
                text: "Olá, digite o CPF ou CNPJ",
            }
        ];

        super('coletaCpfCnpj', audios);
    }

    public eventSim(payload: IEventPayload, response: Response) {
        this.updatePayload(payload, 'sim');
        response.playAndGatherAndRedirect(this.getAudio("SIM_01"));
    }
}

export default Acidente;