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
  <div className="px-2">
    <div className={clsx("flex", { "justify-end": sender === "user" })}>
      <Card
        className={clsx("max-w-80", {
          "bg-black text-white ml-4": sender === "user",
          "bg-white mr-4 max-w-80":
            sender === "system" || sender === "assistant",
        })}
      >
        <CardContent>
          <pre
            className={clsx(
              "whitespace-pre-wrap text-sm text-muted-foreground",
              {
                "text-muted-foreground": sender === "user",
              }
            )}
          >
            {content}
          </pre>
        </CardContent>
      </Card>
    </div>
    <TransactionTable data={transactions} />
  </div>
);
