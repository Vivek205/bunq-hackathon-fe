export type Sender = "user" | "system" | "assistant";

export type Message = {
  sender: Sender;
  content: string;
};

export type Conversation = Message[];
