import Prisma from "@/lib/prisma-db";
import SettingForm from "./components/SettingForm";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";

export const metadata = {
  title: "Settings",
};

const Setting = async ({ params }) => {
  const { userId } = auth();

  const store = await Prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/sign-in");
  }

  return (
    <div className="flex-col">
      <div className="flex-1">
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default Setting;

