"use client";

import { Loader, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Conversation, Message } from "../ChatbotSidebar/types";
import { initialSystemMessage } from "../ChatbotSidebar/constants";
import { useOptimistic, useState, useTransition } from "react";
import { submitUserMessage } from "@/app/actions/conversation";
import { ConversationBox, ConversationBoxSkeleton } from "../ConversationBox";

const PRESET_QUESTIONS = [
  "Help me understand my recent transactions",
  "What are my top spending categories?",
  "Can you provide a summary of my transactions?",
  "How much money did I spend last month?",
];

export const ChatbotMain = () => {
  const [conversation, setConversation] = useState<Conversation>([
    initialSystemMessage,
  ]);
  const [optimisticConversation, addOptimisticMessage] = useOptimistic<
    Conversation,
    Message
  >(conversation, (state, newMessage) => [...state, newMessage]);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    const userContent = formData.get("userMessage") as string;
    startTransition(async () => {
      const userMessage: Message = {
        sender: "user",
        content: userContent,
        sending: true,
      };
      addOptimisticMessage(userMessage);
      const result = await submitUserMessage(formData);
      if (result.success) {
        setConversation((prevConv) => [
          ...prevConv,
          { ...userMessage, sending: false },
          result.message as Message,
        ]);
      }
    });
  };

  const latestMessage =
    optimisticConversation[optimisticConversation.length - 1];

  return (
    <div className="flex flex-col w-full max-w-xl h-full p-4">
      <div>
        <h3 className="font-bold text-2xl">Bunq Buddy</h3>
        <span className="text-sm text-muted-foreground italic">Talk to Your Money.</span>
      </div>
      <div className="grow mt-2 overflow-y-auto">
        {optimisticConversation.map((message, index) => (
          <ConversationBox
            key={index}
            sender={message.sender}
            content={message.content}
            sending={message.sending}
            transactions={message.transactions}
          />
        ))}
        {latestMessage.sending && <ConversationBoxSkeleton />}
      </div>
      {optimisticConversation.length === 1 && (
        <div className="py-4 text-sm grid grid-cols-2 gap-3">
          {PRESET_QUESTIONS.map((question) => (
            <div key={question} className="bg-amber-50 border border-amber-100 hover:bg-amber-100 text-amber-600 px-4 py-2 rounded-lg cursor-pointer" onClick={() =>{
              const formData = new FormData();
              formData.append('userMessage', question);
              handleSubmit(formData)
            }}>{question}</div>
          ))}
        </div>
      )}
      <div>
        <form action={handleSubmit} className="flex gap-2">
          <Input
            disabled={isPending}
            name="userMessage"
            placeholder="Ask anything"
          />
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <Loader className="animate-pulse animate-spin" />
            ) : (
              <Send />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
