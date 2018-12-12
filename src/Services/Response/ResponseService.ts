import XMLElement from "../../Types/XMLElement";
import PlayCommand from "./PlayCommand";
import HangupCommand from "./HangupCommand";
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
                this.audioText.push(audio.text);
                return new PlayCommand("1", `s3://bot-audios/${audio.src}.gsm`);
            })
        );
    }

    public hangup() {
        this.addCommand(new HangupCommand());
    }
}

export default Response;
