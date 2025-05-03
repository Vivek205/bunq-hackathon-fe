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
import { ConversationBox } from "../ConversationBox";
import { submitUserMessage } from "@/app/actions/conversation";
import { useFormStatus } from "react-dom";
import { useState, useTransition } from "react";
import { Conversation, Message } from "./types";
import { initialSystemMessage } from "./constants";

export const ChatbotSidebar = () => {
  const [conversation, setConversation] = useState<Conversation>([
    initialSystemMessage,
  ]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const userMessage = formData.get("userMessage") as string;
      const result = await submitUserMessage(formData);
      if (result.success) {
        const newMessage: Message = {
          sender: "user",
          content: userMessage ?? "",
        };
        setConversation((prevConv) => [...prevConv, newMessage]);
      }
    });
  };

  const status = useFormStatus();
  const { pending } = status;
  console.log("form status", status);

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
        {conversation.map((message, index) => (
          <ConversationBox
            key={index}
            sender={message.sender}
            content={message.content}
          />
        ))}
      </SidebarContent>
      <form action={handleSubmit}>
        <SidebarFooter className="flex flex-row gap-2">
          <Input
            disabled={isPending}
            name="userMessage"
            placeholder="Ask anything"
          />
          <Button disabled={isPending} type="submit">
            {isPending ? <Loader className="animate-pulse" /> : <Send />}
          </Button>
        </SidebarFooter>
      </form>
    </Sidebar>
  );
};
