import Response from "../Services/Response/ResponseService";
import DefaultDialog from "./DefaultDialog";

import IEventPayload from '../Types/IEventPayload';

class Pane extends DefaultDialog {
    constructor() {
        const audios = [
            {
                src: "INI_01",
                text: "Entendi. Então, antes de seguir com a assistência, eu preciso confirmar algumas informações com você."
            }, {
                src: "NAOENTENDE_01",
                text: "Hmm eu não entendi bem. Me fala novamente, você quer atendimento pra esse veículo?"
            }, {
                src: "REPETE_01",
                text: "Eu vou repetir então..."
            }, {
                src: "SILENCIO_02",
                text: "... É pro veículo dessa placa mesmo?! Pode falar:"
            }, {
                src: "SIM_01",
                text: "Ok pane!"
            }
        ];

        super('pane', audios);
    }

    public eventSim(payload: IEventPayload, response: Response) {
        const audio = this.getAudio("SIM_01");
        console.log(audio[0].text);

        this.emit().with(payload, response).onEvent('silence');
        this.emit('acidente').with(payload, response).onEvent('chamouPolicia');
    }

    public eventRepeat() {
        const audio = this.getAudio("REPETE_01");
        console.log(audio[0].text);
    }
}

export default Pane;