import { ActionContext } from "@/context/ActionContext";
import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useContext, useEffect, useRef } from "react";

const SandpackPreviewClient = () => {
  const { sandpack } = useSandpack();
  const previewRef = useRef<SandpackPreviewRef>();
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    GetSandpackClient();
  }, [sandpack && action]);

  const GetSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log(client);
      const result = await client.getCodeSandboxURL();
      if (action.actionType == "deploy") {
        window.open("https://" + result?.sandboxId + ".csb.app");
      } else if (action.actionType == "export") {
        window.open(result.editorUrl);
      }
    }
  };

  return (
    <SandpackPreview
      ref={previewRef}
      style={{ height: "80vh" }}
      showNavigator={true}
    />
  );
};
export default SandpackPreviewClient;
