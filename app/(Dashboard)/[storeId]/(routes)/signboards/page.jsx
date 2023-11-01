import React from "react";
import SignboardClient from "./components/SignboardClient";
import Prisma from "@/lib/prisma-db";
import { format } from "date-fns";

export const metadata = {
  title: "Signboards",
};

const signboards = async ({params}) => {

  const signboards = await Prisma.signboard.findMany({
      where : {
        storeId : params.storeId
      },
      orderBy : {
        createdAt : "desc"
      }
  })

  const formattedColumn = signboards.map((item) => ({
    id : item.id,
    lable : item.lable,
    imageUrl : item.imageUrl,
    createdAt : format(item.createdAt , "MMMM do, yyyy")

  }))


  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4">
        <SignboardClient data={formattedColumn}/>
      </div>
    </div>
  );
};

export default signboards;
