"use client";

import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const FooterSidebar = () => {
  const router = useRouter();
  const options = [
    {
      name: "Settings",
      icon: Settings,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];

  const onOptionClick = (path: string) => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="p-3 mb-5">
      {options.map((option, index) => (
        <Button
          variant={"ghost"}
          className="w-full flex justify-start my-2"
          key={index}
          onClick={() => onOptionClick(option.path)}
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};
export default FooterSidebar;
