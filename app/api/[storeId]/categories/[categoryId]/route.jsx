import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req , {params}){
    try{

        

        const {userId} = auth()
        const body = await req.json();
        const {name , signboardId} = body;

        if(!userId){
            return new NextResponse("Unauthenticated" , {status :401 })
        }

        if(!name){
            return new NextResponse("Name is Required" , {status :400 })
        }

        if(!signboardId){
            return new NextResponse("signboardId is Required" , {status :400 })
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

        const category = await Prisma.category.updateMany({
            where :{
                id : params.categoryId
            },
            data : {
                name,
                signboardId
            }
        })

        return NextResponse.json(category)

    }catch(err){
        console.log(err)
        return new NextResponse("Internal Server Error" , {status : 500})
    }
}

export async function DELETE(req , {params}){
    try{

        const {userId} = auth()

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

        const category = await Prisma.category.deleteMany({
            where :{
                id : params.categoryId
            }
        })

        return NextResponse.json(category)

    }catch(err){
        console.log(err)
        return new NextResponse("Internal Server Error" , {status : 500})
    }
}