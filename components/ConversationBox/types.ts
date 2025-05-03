import { Sender } from "../ChatbotSidebar";
import { Transaction } from "../ChatbotSidebar/types";

export type ConversationBoxProps = {
  sender: Sender;
  content: string;
  sending?: boolean;
  transactions?: Transaction[];
};
