"use client";

import { ArrowRight, Link } from "lucide-react";
import { useContext, useState } from "react";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SigninDialog from "./SigninDialog";

const Hero = () => {
  const [userInput, setUserInput] = useState<string>("");
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const onGenerate = (input: string) => {
    if (!userDetail?.name) {
      setOpenDialog(true);

      return;
    }
    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
    ]);
  };

  const suggestions = [
    "Create TODO App in React",
    "Create Budget Track App",
    "Create Gym Management Portal Dashboard",
    "Create VITE App",
    "Create Login Signup Screen",
  ];

  return (
    <div className="flex flex-col items-center mt-52 lg:mt-36 gap-2">
      <div className="font-bold text-4xl">Build something...</div>
      <div className="text-gray-700 font-medium">
        AI powered platform where you can build your own app
      </div>

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

      <div className="flex flex-wrap max-w-2xl items-center justify-center gap-3 pt-5">
        {suggestions.map((suggestion, index) => (
          <h2
            className="p-1 px-3 border rounded-full text-sm text-gray-700 hover:text-black cursor-pointer"
            key={index}
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>

      <SigninDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};
export default Hero;
