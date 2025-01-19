"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

type MessageType = {
  role: string;
  content: string;
};

type UserDetailType = {
  email: string;
  name: string;
  picture: string;
  uid: string;
  _id: string;
  token: number;
};

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [userDetail, setUserDetail] = useState<UserDetailType | undefined>(
    undefined
  );
  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const result = await convex.query(api.users.GetUser, {
        email: user?.email,
      });

      setUserDetail({
        email: result.email,
        name: result.name,
        picture: result.picture,
        uid: result.uid,
        _id: result._id,
        token: result.token,
      });
      console.log(result);
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process?.env.NEXT_PUBLIC_GOOGLE_AUT_CLIENT_ID_KEY}
    >
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
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
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  );
}
