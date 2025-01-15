"use client";

import { DEFAULT_FILE, DEPENDANCIES } from "@/constants/Values";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { useState } from "react";

type TabType = "code" | "preview";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState<TabType>("code");
  const [files, setFiles] = useState<any>(DEFAULT_FILE);

  return (
    <div>
      <div className="bg-slate-200 w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-white p-1 w-[145px] gap-3 justify-center rounded-full">
          <div
            className={`text-md font-semibold cursor-pointer ${activeTab === "code" && "text-blue-600 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </div>
          <div
            className={`text-md font-semibold cursor-pointer ${activeTab === "preview" && "text-blue-600 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </div>
        </div>
      </div>
      <SandpackProvider
        files={files}
        template="react"
        customSetup={{
          dependencies: {
            ...DEPENDANCIES,
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreview
                style={{ height: "80vh" }}
                showNavigator={true}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};
export default CodeView;
