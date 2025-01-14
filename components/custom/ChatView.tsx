"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Link } from "lucide-react";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const [userInput, setUserInput] = useState<string>("");
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessagesContext);

  useEffect(() => {
    id && GetWorkSpaceData();
  }, [id]);

  const GetWorkSpaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkSpace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };
  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="bg-slate-100 p-3 rounded-lg mb-2 flex gap-2 items-center"
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
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3 bg-slate-50">
        <div className="flex gap-2">
          <textarea
            placeholder="What do you want to build?"
            className="w-full h-48 outline-none border-none resize-none bg-transparent"
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
  );
};
export default ChatView;
