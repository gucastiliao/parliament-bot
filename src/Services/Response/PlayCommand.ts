import XMLElement from "../../Types/XMLElement";

class PlayCommand extends XMLElement {
    constructor(loop:string, content: string) {
        super("Play");
        if (loop) {
            this.addAttribute("loop", loop);
        }
        if (content) {
            this.addText(content);
        }
    }
}

export default PlayCommand;