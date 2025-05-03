export type Sender = "user" | "system" | "assistant";

export type Message = {
  sender: Sender;
  content: string;
  sending?: boolean;
};

export type Conversation = Message[];
