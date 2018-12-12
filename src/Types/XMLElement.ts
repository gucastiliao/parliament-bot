declare global {
  // tslint:disable-next-line:interface-name
  interface Array<T> {
    random(): T;
  }
}

Array.prototype.random = function(){
  return this[Math.floor(Math.random() * this.length)];
};

class XMLElement {
    type: string = "element"
    name: string
    attributes = {}
    elements = []
    constructor(name: string) {
        this.name = name;
    }
    protected addText = (value: string) => {
        this.elements.push({ type: "text", text: value });
    }
    protected addAttribute = (name: string, value: string) => {
        this.attributes[name] = value;
    }
    protected addElement = (element: XMLElement) => {
        this.elements.push(element);
    }
}

export default XMLElement;
