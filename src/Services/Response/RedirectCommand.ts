import XMLElement from "../../Types/XMLElement";

class RedirectCommand extends XMLElement {
    constructor(method: string, content: string) {
        super("Redirect");
        if (method) {
            this.addAttribute("method", method);
        }
        if (content) {
            this.addText(content);
        }
    }
}

export default RedirectCommand;