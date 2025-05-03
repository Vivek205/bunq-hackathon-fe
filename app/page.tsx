import { ChatbotMain } from "@/components/ChatbotMain/ChatbotMain";

export default function Home() {
  return (
    <div className="flex justify-center h-[calc(100vh-32px)] p-4 border-1 rounded-tl-xl rounded-bl-xl m-4 mr-0 border-r-0 bg-white border-neutral-300">
      <ChatbotMain />
    </div>
  );
}
