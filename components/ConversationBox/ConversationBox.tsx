import { FC } from "react";
import { ConversationBoxProps } from "./types";
import { Card, CardContent } from "../ui/card";
import clsx from "clsx";
import { TransactionTable } from "../TransactionTable";

export const ConversationBox: FC<ConversationBoxProps> = ({
  sender,
  content,
  transactions,
}) => (
  <div>
    <Card
      className={clsx({
        "bg-black text-white ml-4": sender === "user",
        "bg-white mr-4": sender === "system" || sender === "assistant",
      })}
    >
      <CardContent>{content}</CardContent>
    </Card>
    <TransactionTable data={transactions} />
  </div>
);
