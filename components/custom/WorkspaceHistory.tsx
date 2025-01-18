"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const WorkspaceHistory = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState<any>();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail._id,
    });

    console.log(result);
    setWorkspaceList(result);
  };
  return (
    <div>
      <div className="text-lg text-black font-medium">Your Chats</div>
      <div>
        {workspaceList &&
          workspaceList.map((workspace, index) => (
            <Link key={index} href={`/workspace/${workspace._id}`}>
              <div
                onClick={toggleSidebar}
                className="text-sm text-gray-600 mt-2 font-light cursor-pointer hover:text-black hover:font-medium"
              >
                {workspace.messages[0].content}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default WorkspaceHistory;
