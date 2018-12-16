import XMLElement from "../../Types/XMLElement";
import PlayCommand from "./PlayCommand";
import HangupCommand from "./HangupCommand";
import GatherCommand from "./GatherCommand";
import RedirectCommand from "./RedirectCommand";
import * as XMLConverter from "xml-js";

import IEventPayload from "../../Types/IEventPayload";
import IAudio from "../../Types/IAudio";

class Response extends XMLElement {
    audioText: string[] = [];
    
    constructor() {
        super("Response");
    }
    
    private addCommand = (command: XMLElement): Response => {
        this.addElement(command);
        return this;
    }
    private addCommands = (commands: XMLElement[]): Response => {
        commands.forEach(command => {
            this.addCommand(command);
        });
        return this;
    }
    
    public getXML = (): string => {
        return XMLConverter.js2xml({ elements: [this] });
    }

    public sendUsing = (payload: IEventPayload): any => {
        payload.response = { text: this.audioText.join(' '), xml: this.getXML() }

        if (this.elements.length > 0) {
            return payload.context.sendActivities([{ text: this.getXML() }]);
        } else {
            return payload.context.sendActivities([]);
        }
    }

    public play(audios: IAudio[]) {
        
        this.addCommands(
            audios.map(audio => {
                console.log(`[response.play] - ${audio.src}`);
                this.audioText.push(audio.text);
                return new PlayCommand("1", `s3://bot-audios/${audio.src}.gsm`);
            })
        );
    }

    public gather(timeout: string = "3") {
        this.addCommand(new GatherCommand("speech", null, timeout, null, null));
    }

    public gatherAndRedirect(timeout: string = "3") {
        this.gather(timeout);
        this.redirect();
    }

    public playAndGatherAndRedirect(audios: IAudio[], timeout: string = "3") {
        this.play(audios);
        this.gatherAndRedirect(timeout);
    }

    public gatherDTMF(timeout: string = "5") {
        this.addCommand(new GatherCommand("dtmf", null, timeout, "11", null));
    }

    public redirect() {
        this.addCommand(new RedirectCommand("POST", "?SpeechResult=SILENCE_TIMEOUT"));
    }

    public hangup() {
        this.addCommand(new HangupCommand());
    }
}

export default Response;
