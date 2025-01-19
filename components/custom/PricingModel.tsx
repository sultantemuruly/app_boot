import { PRICING_OPTIONS } from "@/constants/Pricing";
import { Button } from "../ui/button";

const PricingModel = () => {
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

          <Button>Upgrade to {pricing.name}</Button>
        </div>
      ))}
    </div>
  );
};
export default PricingModel;
