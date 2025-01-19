"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode, PanelLeftCloseIcon } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import FooterSidebar from "./FooterSidebar";

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div className="flex justify-between">
          <Image src={"/logo.svg"} alt="logo" width={64} height={64} />
          <Button
            variant={"ghost"}
            className="w-[32px] h-[32px] rounded-full"
            onClick={toggleSidebar}
          >
            <PanelLeftCloseIcon />
          </Button>
        </div>
        <Button className="mt-6">
          {" "}
          <MessageCircleCode /> Start New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <FooterSidebar />
      </SidebarFooter>
    </Sidebar>
  );
}
