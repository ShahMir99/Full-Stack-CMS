import AnalyticSection from "@/components/Analytic-section";
import GraphSection from "@/components/GraphSection";
import InfoBox from "@/components/Info-box";
import Prisma from "@/lib/prisma-db";

const page = async ({ params }) => {
  const store = await Prisma.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 gap-5">
      <InfoBox />
      <AnalyticSection />
      <div className="bg-white col-span-full lg:col-span-8 shadow-md rounded-md p-8">
        <div className="mb-8">
          <h3 className="text-xl font-semibold ">
            Total Revenue
          </h3>
        </div>
        <div className="overflow-x-auto lg:overflow-hidden">
          <GraphSection />
        </div>
      </div>
    </div>
  );
};

export default page;
