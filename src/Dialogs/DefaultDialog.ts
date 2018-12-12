import EmitterService from "../Services/EmitterService";
import DialogNameEnum from "../Types/Dialogs/DialogNameEnum";
import IEventPayload from "../Types/IEventPayload";

interface IAudio {
    src: string;
    text: string;
}

class DefaultDialog extends EmitterService {
    public dialogName: string;
    public audios: IAudio[] = [];

    constructor(dialogName: string, audios: IAudio[]) {
        super();
        
        this.dialogName = DialogNameEnum[dialogName];
        this.audios = audios;
        
        super.convertFunctionsToEvents();
    }

    public updatePayload(payload: IEventPayload, eventName) {
        payload.state.currentDialog = {
            main: this.dialogName,
            secundary: eventName,
            class: this.constructor.name
        };
    }

    public getAudio(audioName: string): IAudio[] {
        return this.audios.filter((audio) => {
            if (audio.src === audioName) {
                audio.src = `${this.dialogName}_${audio.src}`;
                return true;
            }
        });
    }

    public eventIni(payload, response) {console.log('Event Ini ' + this.dialogName)}
    public eventNone(payload, response) {console.log('Event None ' + this.dialogName)}
    public eventRepeat(payload, response) {console.log('Event Repeat ' + this.dialogName)}
    public eventSilence(payload, response) {console.log('Event Silence ' + this.dialogName)}
}

export default DefaultDialog;
