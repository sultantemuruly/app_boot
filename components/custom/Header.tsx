import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="p-6 flex justify-between items-center">
      <div className="flex items-center gap-5">
        <Image src={"/logo.svg"} alt="logo" width={48} height={48} />
        <div className="font-bold text-2xl">App Boot</div>
      </div>
      <div className="flex gap-5">
        <Button variant={"outline"}>Sign In</Button>
        <Button className="bg-blue-600">Get Started</Button>
      </div>
    </div>
  );
};
export default Header;
