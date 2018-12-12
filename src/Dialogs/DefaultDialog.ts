import EmitterService from "../Services/EmitterService";
import DialogNameEnum from "../Types/Dialogs/DialogNameEnum";

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

    public getAudio(audioName: string): IAudio[] {
        return this.audios.filter((audio) => {
            return audio.src === audioName;
        });
    }

    public eventIni(payload, response) {console.log('Event Ini ' + this.dialogName)}
    public eventNone(payload, response) {console.log('Event None ' + this.dialogName)}
    public eventRepeat(payload, response) {console.log('Event Repeat ' + this.dialogName)}
    public eventSilence(payload, response) {console.log('Event Silence ' + this.dialogName)}
}

export default DefaultDialog;
