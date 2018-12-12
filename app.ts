import Acidente from "./Dialogs/Acidente";
import Pane from "./Dialogs/Pane";
import PerguntaChamouPolicia from "./Dialogs/PerguntaChamouPolicia";

const payload = {};
const response = {};

const acidente = new Acidente();
const pane = new Pane();
const perguntaChamouPolicia = new PerguntaChamouPolicia();

acidente.emit().with(payload, response).onEvent('sim');