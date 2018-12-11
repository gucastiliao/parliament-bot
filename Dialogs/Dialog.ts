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
    }

    public getAudio(audioName: string): IAudio[] {
        return this.audios.filter((audio) => {
            return audio.src === audioName;
        });
    }

    public onEventIni(payload, response) {}
    public onEventNone(payload, response) {}
    public onEventRepeat(payload, response) {}
    public onEventSilence(payload, response) {}
}

export default Dialog;
