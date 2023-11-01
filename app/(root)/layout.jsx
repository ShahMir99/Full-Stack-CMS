import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {

  const {userId} = auth()

  if(!userId){
    redirect('/sign-in')
  }

  const store = await Prisma.store.findFirst({
      where : {
        userId
      }
  })

  if(store){
    redirect(`/${store.id}`)
  }

  
  return (
    <div>{children}</div>
  );
}
