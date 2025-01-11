"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MessagesContext } from "@/context/MessagesContext";

type Message = {
  role: string;
  content: string;
};

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="white"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </MessagesContext.Provider>
  );
}
