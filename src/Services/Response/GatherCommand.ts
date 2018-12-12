import XMLElement from "../../Types/XMLElement";

class GatherCommand extends XMLElement {
    constructor(input:string, action: string, timeout: string, numDigits: string, hints: string) {
        super("Gather");
        if (input) {
            this.addAttribute("input", input);
        }
        if (action) {
            this.addAttribute("action", action);
        }
        if (timeout) {
            this.addAttribute("timeout", timeout);
        }
        if (numDigits) {
            this.addAttribute("numDigits", numDigits);
        }
        if (hints) {
            this.addAttribute("hints", hints);
        }
    }
}

export default GatherCommand;