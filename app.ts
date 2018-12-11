import Acidente from "./Dialogs/Acidente";
import Pane from "./Dialogs/Pane";
import EventService from "./Services/EventService";

const acidente = new Acidente();
const pane = new Pane();

EventService.trigger("EUR_ACIDENTE.onEventSim", {}, {})
EventService.trigger("EUR_ACIDENTE.onEventSilence", {}, {})
EventService.trigger("EUR_PANE.onEventRepeat", {}, {})