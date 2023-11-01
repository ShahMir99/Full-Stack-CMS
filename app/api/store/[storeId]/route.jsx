import Prisma from "@/lib/prisma-db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH(req , {params}){
    try{
        const {userId} = auth()

        const body = await req.json()
        const {name} = body

        if(!userId){
            return new NextResponse("unauthorized" , 401)
        }

        if(!name){
            return new NextResponse("name is required" , 400)
        }

        if(!params.storeId){
            return new NextResponse("Store id is required" , 400)
        }

        const store = await Prisma.store.updateMany({
            where : {
                id : params.storeId,
                userId
            },
            data : {
                name
            }
        })

        return NextResponse.json(store)

    }catch(err){
        console.log('[STORE_UPDATED]' , err);
        return new NextResponse("Internal Error" , {status : 500})
    }
}

export async function DELETE(req , {params}){
    try{

        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthenticated" , {status : 401})
        }

        if(!params.storeId){
            return new NextResponse("store id is required" , {status : 400})
        }

        const store = await Prisma.store.deleteMany({
            where : {
                userId,
                id : params.storeId
            }
        })

        return NextResponse.json(store)

    }catch(err){
        console.log('[STORE_DELETE]' , err);
            return new NextResponse("Internal Error" , {status : 500})
    }
}