import EmitterService from "../Services/EmitterService";

interface IAudio {
    src: string;
    text: string;
}

class Dialog extends EmitterService {
    public dialogName: string;
    public audios: IAudio[] = [];

    constructor(dialogName: string, audios: IAudio[]) {
        super();
        
        this.dialogName = dialogName;
        this.audios = audios;
        
        super.convertFunctionsToEvents();
    }

    public getAudio(audioName: string): IAudio[] {
        return this.audios.filter((audio) => {
            return audio.src === audioName;
        });
    }

    public onEventIni(payload, response) {console.log('Event Ini ' + this.dialogName)}
    public onEventNone(payload, response) {console.log('Event None ' + this.dialogName)}
    public onEventRepeat(payload, response) {console.log('Event Repeat ' + this.dialogName)}
    public onEventSilence(payload, response) {console.log('Event Silence ' + this.dialogName)}
}

export default Dialog;
