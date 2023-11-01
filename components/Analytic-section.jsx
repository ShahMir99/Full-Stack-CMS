"use client";

import {
  ArrowUp,
  Folder,
  LineChart,
  MoreVertical,
  Package,
  PieChart,
} from "lucide-react";
import { Button } from "./ui/button";
import YealySection from "./Yealy-section";

const AnalyticSection = () => {
  return (
    <div className="row-span-3 col-span-full lg:col-span-4 p-2 ">
      <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
        {/* firs Box */}

        <div className="bg-white p-5 flex flex-col gap-y-5 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#a1da83] p-3">
              <PieChart className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Profit</p>
            <h3 className="text-xl font-semibold tracking-wide">
              $ 12,628
            </h3>
          </div>
          <div className="flex gap-2 text-[#8bd663] text-sm">
            <ArrowUp className="h-4 w-4" />
            <p>72.8%</p>
          </div>
        </div>

        {/* Second Box */}

        <div className="bg-white p-5 flex flex-col gap-y-5 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#04c3ec] p-3">
              <LineChart className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Sales</p>
            <h3 className="text-xl font-semibold  tracking-wide">
              $ 4,679
            </h3>
          </div>
          <div className="flex gap-2 text-[#04c3ec] text-sm">
            <ArrowUp className="h-4 w-4" />
            <p>28.42%</p>
          </div>
        </div>
        {/* Third Box */}

        <div className="bg-white p-5 flex flex-col gap-y-5 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#ff3e1d] p-3">
              <Package className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Products</p>
            <h3 className="text-xl font-semibold  tracking-wide">
              340
            </h3>
          </div>
          <div className="flex gap-2 text-[#ff3e1d] text-sm">
            <ArrowUp className="h-4 w-4" />
            <p>16%</p>
          </div>
        </div>
        {/* Fouth Box */}

        <div className="bg-white p-5 flex flex-col gap-y-5 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <Button className="bg-[#696cff] p-3">
              <Folder className="text-white" />
            </Button>
            <MoreVertical className=" text-[#7a7a7a]" />
          </div>
          <div>
            <p className="text-[#999999] pb-2">Orders</p>
            <h3 className="text-xl font-semibold  tracking-wide">
              970
            </h3>
          </div>
          <div className="flex gap-2 text-[#696cff] text-sm">
            <ArrowUp className="h-4 w-4" />
            <p>34%</p>
          </div>
        </div>
      </div>
      <YealySection />
    </div>
  );
};

export default AnalyticSection;
