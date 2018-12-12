import EventService from "./EventService";
import DialogNameEnum from "../src/Types/Dialogs/DialogNameEnum";

class EmitterService {
    private onDialog: string;
    private eventName: string;
    private payload;
    private response;

    public emit(onDialog: string = undefined) {
        this.onDialog = onDialog;

        this.onDialog = (onDialog === undefined) 
            ? this['dialogName']
            : DialogNameEnum[onDialog];

        return this;
    }

    public with(payload, response) {
        this.payload = payload;
        this.response = response;

        return this;
    }

    public onEvent(eventName: string) {
        this.eventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

        return EventService.trigger(
            `${this.onDialog}.event${this.eventName}`, 
            this.payload,
            this.response
        );
    }


    public hasMethod (obj, name) {
        const desc = Object.getOwnPropertyDescriptor (obj, name);
        return !!desc && typeof desc.value === 'function';
    }

    public convertFunctionsToEvents() {
        let proto = Object.getPrototypeOf(this);
        
        console.log('[EmitterService] Registering events to -> ' + proto.constructor.name);

        while (proto) {
            Object.getOwnPropertyNames(proto).forEach (name => {
                if (name !== 'constructor' && name.indexOf("event") !== -1) {
                    if (this.hasMethod(proto, name)) {
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
