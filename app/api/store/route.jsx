import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req){
try{
    const data = await req.json()
    const {name} = data;
    const {userId} = auth()

    if(!userId){
        return new NextResponse("unauthorized",{status : 401})
    }

    if(!name){
        return new NextResponse("name is required" , {status : 400})
    }

    const store = await Prisma.store.create({
        data : {
            name,
            userId
        }
    })


    return NextResponse.json(store)

}catch(err){
    console.log('[STORE_POST]' , err);
        return new NextResponse("Internal Error" , {status : 500})
}
}   