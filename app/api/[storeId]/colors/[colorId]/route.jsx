import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req , {params}){
    try{
        const body = await req.json()
        const {name , value} = body;
        const {userId} = auth()

        if(!userId){
            return new NextResponse("unauthenticated" , {status : 401})
        }

        if(!name){
            return new NextResponse("name is required" , {status : 400})
        }

        if(!value){
            return new NextResponse("value is required" , {status : 400})
        }

        if(!params.colorId){
            return new NextResponse("Color Id is required" , {status : 400})
        }

        const StoreByUser = await Prisma.store.findFirst({
            where : {
                id : params.storeId,
                userId
            }
        })

        if(!StoreByUser){
            return new NextResponse("Unauthorized" , {status : 401})
        }
    
        const color = await Prisma.color.updateMany({
            where : {
                id : params.colorId
            },
            data : {
                name,
                value
            }
        })

        return NextResponse.json(color)

    }catch(err){
        console.log(err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}


export async function DELETE(req , {params}){
    try{
        const {userId} = auth()

        if(!userId){
            return new NextResponse("unauthenticated" , {status : 401})
        }

        if(!params.colorId){
            return new NextResponse("Size Id is required" , {status : 400})
        }

        const StoreByUser = await Prisma.store.findFirst({
            where : {
                id : params.storeId,
                userId
            }
        })

        if(!StoreByUser){
            return new NextResponse("Unauthorized" , {status : 401})
        }
    
        const color = await Prisma.color.deleteMany({
            where : {
                id : params.colorId
            },
        })

        return NextResponse.json(color)

    }catch(err){
        console.log(err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}