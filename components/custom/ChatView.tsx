"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Link, Loader } from "lucide-react";
import axios from "axios";
import { CHAT_PROMPT } from "@/constants/Prompt";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../ui/sidebar";
import { countToken } from "@/lib/countToken";
import { toast } from "sonner";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();

  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);

  const UpdataMessages = useMutation(api.workspace.UpdateMessages);
  const UpdateToken = useMutation(api.users.UpdateToken);

  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    id && GetWorkSpaceData();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GetAIResponse();
      }
    }
  }, [messages]);

  const GetWorkSpaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkSpace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };

  const GetAIResponse = async () => {
    setIsLoading(true);

    const PROMPT = JSON.stringify(messages) + CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });

    const aiResponse = {
      role: "ai",
      content: result.data.result,
    };

    setMessages((prev) => [...prev, aiResponse]);

    await UpdataMessages({
      workspaceId: id,
      messages: [...messages, aiResponse],
    });

    const userToken = Number(userDetail?.token);
    const token = userToken - Number(countToken(JSON.stringify(aiResponse)));

    await UpdateToken({
      userId: userDetail._id,
      token: token,
    });

    setUserDetail((prev) => ({
      ...prev,
      token: token,
    }));

    setIsLoading(false);
  };

  const onGenerate = async (input: string) => {
    if (userDetail.token < 10) {
      toast("You don't have enough token to generate");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide px-5">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="bg-slate-100 p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
          >
            {msg?.role === "user" && userDetail?.picture && (
              <Image
                src={userDetail.picture}
                alt="userImage"
                width={35}
                height={35}
                className="rounded-full"
              />
            )}
            <ReactMarkdown className="flex flex-col">
              {msg.content}
            </ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div className="bg-slate-100 p-3 rounded-lg mb-2 flex gap-2 items-center">
            <Loader className="animate-spins" />
            <p className="text-gray-400 ">Generating response...</p>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="flex gap-2 items-end">
        {userDetail && (
          <Image
            src={userDetail?.picture}
            alt={"user"}
            width={35}
            height={35}
            className="rounded-full"
            onClick={toggleSidebar}
          />
        )}
        <div className="p-5 border rounded-xl max-w-xl w-full mt-3 bg-slate-50">
          <div className="flex gap-2">
            <textarea
              placeholder="What do you want to build?"
              className="w-full h-48 outline-none border-none resize-none bg-transparent"
              value={userInput}
              onChange={(event) => {
                setUserInput(event.target.value);
              }}
            />
            {userInput ? (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-blue-600 text-white p-2 h-8 w-8 rounded-md cursor-pointer"
              />
            ) : null}
          </div>
          <div>
            <Link className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatView;
