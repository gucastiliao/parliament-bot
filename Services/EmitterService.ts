import EventService from "./EventService";

class EmitterService {
    constructor() {
        this.convertFunctionsToEvents();
    }

    public emit(method) {}

    public hasMethod (obj, name) {
        const desc = Object.getOwnPropertyDescriptor (obj, name);
        return !!desc && typeof desc.value === 'function';
    }

    public convertFunctionsToEvents() {
        console.log('Hello from EmitterService!', this);

        let array = [];
        let proto = Object.getPrototypeOf(this);

        while (proto) {
            Object.getOwnPropertyNames(proto).forEach (name => {
                if (name !== 'constructor' && name.indexOf("onEvent") !== -1) {
                    if (this.hasMethod(proto, name)) {
                        array.push(name);
                        proto[name]();
                    }
                }
            });

            proto = Object.getPrototypeOf(proto);
        }

        // console.log(array);
    }
}

export default EmitterService;
