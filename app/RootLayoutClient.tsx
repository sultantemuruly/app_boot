"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";

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
  const [action, setAction] = useState();

  const router = useRouter();

  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);

  const IsAuthenticated = async () => {
    if (typeof window !== undefined) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user) {
        router.push("/");
        return;
      }

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
      <PayPalScriptProvider
        options={{ clientId: process?.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessagesContext.Provider value={{ messages, setMessages }}>
            <ActionContext.Provider value={{ action, setAction }}>
              <ThemeProvider
                attribute="class"
                defaultTheme="white"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </ActionContext.Provider>
          </MessagesContext.Provider>
        </UserDetailContext.Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
}
