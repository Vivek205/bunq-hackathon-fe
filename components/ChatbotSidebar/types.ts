export type Sender = "user" | "system" | "assistant";

export type Transaction = {
  amount: number;
  created: number;
  description: string;
  alias: string;
};

export type Message = {
  sender: Sender;
  content: string;
  sending?: boolean;
  transactions?: Transaction[];
};

export type Conversation = Message[];
