import { Bot, Send } from "lucide-react";
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

export const ChatbotSidebar = () => {
  const { pending } = useFormStatus();
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
        {[1, 2, 3, 4, 5].map((el) => (
          <ConversationBox
            key={el}
            sender={el % 2 === 0 ? "user" : "system"}
            message="lorem ipsum dolor set apaumadf asdfsd"
          />
        ))}
      </SidebarContent>
      <form action={submitUserMessage}>
        <SidebarFooter className="flex flex-row gap-2">
          <Input
            disabled={pending}
            name="user-message"
            placeholder="Ask anything"
          />
          <Button disabled={pending} type="submit">
            <Send />
          </Button>
        </SidebarFooter>
      </form>
    </Sidebar>
  );
};
