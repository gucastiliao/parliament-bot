import Response from "../Services/Response/ResponseService";
import DefaultDialog from "./DefaultDialog";

import IEventPayload from '../Types/IEventPayload';

class ColetaPlaca extends DefaultDialog {
    constructor() {
        const audios = [
            {
                src: "INIT_01",
                text: "Olá, digite a placa",
            }
        ];

        super('coletaPlaca', audios);
    }
}

export default ColetaPlaca;