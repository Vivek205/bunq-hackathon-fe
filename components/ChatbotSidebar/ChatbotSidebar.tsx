"use client";
import { Bot, Loader, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import { ConversationBox, ConversationBoxSkeleton } from "../ConversationBox";
import { submitUserMessage } from "@/app/actions/conversation";
import { useFormStatus } from "react-dom";
import { useOptimistic, useState, useTransition } from "react";
import { Conversation, Message } from "./types";
import { initialSystemMessage } from "./constants";

export const ChatbotSidebar = () => {
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

  const status = useFormStatus();
  const { pending } = status;
  console.log("optimisticConversation", optimisticConversation);
  console.log("conversation", conversation);

  const latestMessage =
    optimisticConversation[optimisticConversation.length - 1];

  return (
    <Sidebar>
      <SidebarHeader className="gap-0">
        <div className="flex justify-between font-bold">
          <p>AI Assistant</p>
          <Bot />
        </div>
        <span className="text-sm">Always here to help</span>
      </SidebarHeader>
      <SidebarContent className="p-1">
        {optimisticConversation.map((message, index) => (
          <ConversationBox
            key={index}
            sender={message.sender}
            content={message.content}
            sending={message.sending}
          />
        ))}
        {latestMessage.sending && <ConversationBoxSkeleton />}
      </SidebarContent>
      <form action={handleSubmit}>
        <SidebarFooter className="flex flex-row gap-2">
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
        </SidebarFooter>
      </form>
    </Sidebar>
  );
};
