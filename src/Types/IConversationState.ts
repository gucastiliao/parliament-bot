import ICurrentDialog from "./ICurrentDialog";

interface IConversationState {
  cpfCnpj: string;
  plate: string;
  currentDialog: ICurrentDialog;
}

export default IConversationState;
