"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { DownloadIcon, RocketIcon } from "lucide-react";
import { ActionContext } from "@/context/ActionContext";
import { usePathname } from "next/navigation";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);

  const path = usePathname();

  const onActionBtn = (action: string) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="p-6 flex justify-between items-center">
      <div className="flex items-center gap-5">
        <Image src={"/logo.svg"} alt="logo" width={48} height={48} />
        <div className="font-bold text-2xl">App Boot</div>
      </div>
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant={"outline"}>Sign In</Button>
          <Button className="bg-blue-600">Get Started</Button>
        </div>
      ) : (
        path.includes("workspace") && (
          <div className="flex gap-5">
            <Button variant={"outline"} onClick={() => onActionBtn("export")}>
              Export <DownloadIcon />
            </Button>
            <Button
              className="bg-blue-600"
              onClick={() => onActionBtn("deploy")}
            >
              <RocketIcon />
              Deploy
            </Button>
          </div>
        )
      )}
    </div>
  );
};
export default Header;
