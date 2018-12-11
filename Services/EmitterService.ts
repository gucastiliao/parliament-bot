import EventService from "./EventService";

class EmitterService {
    public emit(method) {}

    public hasMethod (obj, name) {
        const desc = Object.getOwnPropertyDescriptor (obj, name);
        return !!desc && typeof desc.value === 'function';
    }

    public convertFunctionsToEvents() {
        let array = [];
        let proto = Object.getPrototypeOf(this);
        
        console.log('Hello from EmitterService -> ' + proto.constructor.name);

        while (proto) {
            Object.getOwnPropertyNames(proto).forEach (name => {
                if (name !== 'constructor' && name.indexOf("onEvent") !== -1) {
                    if (this.hasMethod(proto, name)) {
                        array.push(name);
                        console.log(`${this['dialogName']}.${name}`);
                        EventService.on(`${this['dialogName']}.${name}`, this[name].bind(this));
                    }
                }
            });

            proto = Object.getPrototypeOf(proto);
        }

        console.log('Events registered!');
        console.log('---------------------');
    }
}

export default EmitterService;
