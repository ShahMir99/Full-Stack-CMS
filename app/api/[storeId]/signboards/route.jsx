import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req , {params}){
    try{

        const body = await req.json();
        const {lable , imageUrl} = body;

        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthenticated" , {status :401 })
        }

        if(!lable){
            return new NextResponse("Lable is Required" , {status :400 })
        }

        if(!imageUrl){
            return new NextResponse("imageUrl is Required" , {status :400 })
        }

        if(!params.storeId){
            return new NextResponse("StoreId is Required" , {status :400 })
        }

        const StoreByUser = await Prisma.store.findFirst({
            where : {
                id : params.storeId,
                userId
            }
        })

        if(!StoreByUser){
            return new NextResponse("unauthorized", {status : 403})
        }

        const signboard = await Prisma.signboard.create({
            data : {
                storeId : params.storeId,
                lable,
                imageUrl
            }
        })

        return NextResponse.json(signboard)

    }catch(err){
        console.log('[SIGNBOARD_ERROR]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}