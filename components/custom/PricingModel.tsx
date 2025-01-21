import { PRICING_OPTIONS, PlanType } from "@/constants/Pricing";
import { Button } from "../ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

const PricingModel = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const UpdateToken = useMutation(api.users.UpdateToken);

  const [selectedOption, setSelectedOption] = useState<PlanType | null>(null);

  const onPaymentSuccess = async () => {
    const token = userDetail.token + Number(selectedOption?.value);
    console.log(token);
    await UpdateToken({
      userId: userDetail._id,
      token: token,
    });
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {PRICING_OPTIONS.map((pricing, index) => (
        <div key={index} className="border rounded-lg p-4 flex flex-col gap-3">
          <div className="font-bold text-2xl">{pricing.name}</div>
          <div className="font-medium text-lg">{pricing.tokens} Tokens</div>
          <div className="text-sm text-slate-900">{pricing.desc}</div>

          <div className="font-bold text-4xl text-center mt-6 text-green-900">
            {pricing.price}$
          </div>

          {/* <Button>Upgrade to {pricing.name}</Button> */}
          <PayPalButtons
            disabled={!userDetail}
            style={{ layout: "horizontal" }}
            onClick={() => setSelectedOption(pricing)}
            onApprove={() => onPaymentSuccess()}
            onCancel={() => console.log("Payment Canceled")}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: pricing.price,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default PricingModel;
