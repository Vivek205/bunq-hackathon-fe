import { FC } from "react";
import { ConversationBoxProps } from "./types";
import { Card, CardContent } from "../ui/card";
import clsx from "clsx";

export const ConversationBox: FC<ConversationBoxProps> = ({
  sender,
  content,
}) => (
  <Card
    className={clsx({
      "bg-black text-white ml-4": sender === "user",
      "bg-white mr-4": sender === "system",
    })}
  >
    <CardContent>{content}</CardContent>
  </Card>
);
