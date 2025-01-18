import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import { Button } from "../ui/button";

const FooterSidebar = () => {
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
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];

  return (
    <div className="p-3 mb-5">
      {options.map((option, index) => (
        <Button
          variant={"ghost"}
          className="w-full flex justify-start my-2"
          key={index}
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};
export default FooterSidebar;
