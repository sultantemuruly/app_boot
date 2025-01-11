import { createContext } from "react";

type Message = {
  role: string;
  content: string;
};

type MessagesContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);
