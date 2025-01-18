import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";

const Workspace = () => {
  return (
    <div className="p-3 pr-5">
      {/* Flex container */}
      <div className="flex flex-col md:flex-row gap-12 w-full">
        {/* ChatView section */}
        <div className="w-full md:w-1/4 border border-slate-300">
          <ChatView />
        </div>

        {/* Placeholder for CodeView */}
        <div className="w-full md:w-1/2 flex-grow">
          <div
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "lightgray",
            }}
          >
            <CodeView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
