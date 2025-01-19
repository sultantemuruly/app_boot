"use client";

import PricingModel from "@/components/custom/PricingModel";
import { PRICING_DESC } from "@/constants/Pricing";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Loader2Icon } from "lucide-react";
import { useContext } from "react";

const PricingPage = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  if (!userDetail) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Loader2Icon className="animate-spin" />
        Loading user details...
      </div>
    );
  }

  return (
    <div className="main-content flex flex-col items-center justify-start w-full max-w-4xl mx-auto mt-20">
      <div className="font-bold text-4xl text-center">Pricing</div>
      <div className="text-gray-600 text-center mt-2">{PRICING_DESC}</div>

      <div className="p-5 border rounded-xl w-full flex justify-between mt-7 items-center">
        <div className="text-lg">
          <span className="font-bold">{userDetail.token}</span> tokens left
        </div>
        <div>
          <div className="font-semibold">Need more token?</div>
          <div>Upgrade your plane</div>
        </div>
      </div>

      <PricingModel />
    </div>
  );
};

export default PricingPage;
