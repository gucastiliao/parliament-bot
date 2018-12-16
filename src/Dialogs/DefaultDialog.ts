import Response from "../Services/Response/ResponseService";
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
        for (const key in this.audios) {
            if (this.audios[key].src === audioName) {
                return [
                    {
                        src: `${this.dialogName}_${this.audios[key].src}`,
                        text: this.audios[key].text
                    }
                ];
            }
        }
    }

    public eventInit(payload: IEventPayload, response: Response) {
        response.playAndGatherAndRedirect(this.getAudio("INIT_01"))
    }

    public eventNone(payload: IEventPayload, response: Response) {
        response.playAndGatherAndRedirect(this.getAudio("NONE_01"))
    }

    public eventRepeat(payload: IEventPayload, response: Response) {
        response.playAndGatherAndRedirect(this.getAudio("REPEAT_01"))
    }

    public eventSilence(payload: IEventPayload, response: Response) {
        response.playAndGatherAndRedirect(this.getAudio("SILENCE_01"))
    }

}

export default DefaultDialog;
