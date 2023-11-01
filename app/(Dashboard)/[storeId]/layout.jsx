import Navbar from "@/components/Navbar";
import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Layout({ children, params }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

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
    <div className="p-4">
      <Navbar />
      {children}
    </div>
  );
}
