import * as EventEmitter from "events";

class Events {
  private pubSub: EventEmitter;

  public constructor() {
    this.pubSub = new EventEmitter();
  }

  public trigger = (eventName: string, payload, response: Response) => {
    if (!(this.pubSub.listenerCount(eventName) > 0)) {
      const splitStr = eventName.split(".");
      eventName = `${splitStr[0]}.NONE`;
    }
    
    this.pubSub.emit(eventName, payload, response);
  };

  public on(eventName: string, callBack: (payload, response: Response) => void) {
    this.pubSub.on(eventName, callBack);
  }
}

const EventsService = new Events();

export default EventsService;
