"use client";

import { Loader, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Conversation, Message } from "../ChatbotSidebar/types";
import { initialSystemMessage } from "../ChatbotSidebar/constants";
import { useOptimistic, useState, useTransition } from "react";
import { submitUserMessage } from "@/app/actions/conversation";
import { ConversationBox, ConversationBoxSkeleton } from "../ConversationBox";

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
    startTransition(async () => {
      const userContent = formData.get("userMessage") as string;
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
    <div className="flex flex-col w-96 h-full border-r-2 border-l-2 p-2">
      <div>
        <h3 className="font-bold">AI Assistant</h3>
        <span className="text-xs">Always here to help</span>
      </div>
      <div className="grow">
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
