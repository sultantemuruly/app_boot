import { createContext } from "react";

type MessageType = {
  role: string;
  content: string;
};

type MessagesContextType = {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
};

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);
