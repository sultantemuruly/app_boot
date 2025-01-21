"use client";

import { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

import { DEFAULT_FILES, DEPENDENCIES } from "@/constants/Values";
import { CODE_GEN_PROMPT } from "@/constants/Prompt";

import axios from "axios";
import { MessagesContext } from "@/context/MessagesContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { countToken } from "@/lib/countToken";

type TabType = "code" | "preview";

const CodeView = () => {
  const { id } = useParams();
  const convex = useConvex();

  const [activeTab, setActiveTab] = useState<TabType>("code");
  const [files, setFiles] = useState<any>(DEFAULT_FILES);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setIsLoading(true);

    const result = await convex.query(api.workspace.GetWorkSpace, {
      workspaceId: id,
    });

    const mergedFiles = { ...result?.fileData }; //...DEFAULT_FILES,
    setFiles(mergedFiles);

    setIsLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setIsLoading(true);

    const PROMPT = JSON.stringify(messages) + " " + CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });

    console.log(result.data);
    const aiResponse = result.data;

    const mergedFiles = { ...aiResponse.files }; //...DEFAULT_FILES,
    setFiles(mergedFiles);
    await UpdateFiles({
      workspaceId: id,
      files: aiResponse.files,
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

  return (
    <div className="w-full relative">
      {/* Tab Selector */}
      <div className="bg-slate-200 w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-white p-1 w-[145px] gap-3 justify-center rounded-full">
          <div
            className={`text-md font-semibold cursor-pointer ${
              activeTab === "code" &&
              "text-blue-600 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </div>
          <div
            className={`text-md font-semibold cursor-pointer ${
              activeTab === "preview" &&
              "text-blue-600 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </div>
        </div>
      </div>

      {/* Sandpack Provider */}
      <SandpackProvider
        files={files}
        template="react"
        customSetup={{
          dependencies: {
            ...DEPENDENCIES,
          },
        }}
      >
        <SandpackLayout>
          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <SandpackPreview style={{ height: "80vh" }} showNavigator={true} />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {isLoading && (
        <div className="p-10 bg-blue-700 opacity-50 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <div className="text-white">Generating code...</div>
        </div>
      )}
    </div>
  );
};

export default CodeView;
