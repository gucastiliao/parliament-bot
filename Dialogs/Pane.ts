import Dialog from "../Dialogs/Dialog";

class Pane extends Dialog {
    constructor() {
        const dialogs = [
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

        super('EUR_PANE', dialogs);
    }

    public onEventSim() {
        const audio = this.getAudio("SIM_01");
        console.log(audio[0].text);
    }
}

export default Pane;