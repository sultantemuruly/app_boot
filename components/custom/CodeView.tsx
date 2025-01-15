"use client";

import { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

import { DEFAULT_FILES, DEPENDENCIES } from "@/constants/Values";

type TabType = "code" | "preview";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState<TabType>("code");

  return (
    <div className="w-full">
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
        files={DEFAULT_FILES}
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
    </div>
  );
};

export default CodeView;
