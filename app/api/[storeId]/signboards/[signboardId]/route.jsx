import Prisma from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function PATCH(req , {params}){
try{

    const {userId} = auth()
    const body = await req.json()
    const {lable , imageUrl} = body;


    if(!userId){
        return new NextResponse("Unauthenticated" , {status : 401})
    }

    if(!lable){
        return new NextResponse("label is required" , {status : 400})
    }

    if(!imageUrl){
        return new NextResponse("imageUrl is required" , {status : 400})
    }

    if(!params.signboardId){
        return new NextResponse("signboardId id is required" , {status : 400})
    }

    const storeByUser = await Prisma.store.findFirst({
        where : {
            id : params.storeId,
            userId
        }
    })

    if(!storeByUser){
        return new NextResponse("Unauthrized" , {status : 400})
    }

    const signboard = await Prisma.signboard.updateMany({
        where : {
            id : params.signboardId,
        },
        data : {
            lable,
            imageUrl
        }
    })

    return NextResponse.json(signboard)

}catch(err){
    console.log("SIGNBOARD_UPDATE_ERROR" , err)
    return new NextResponse("Internal server error" , {status : 500})
}
}

export async function DELETE(req , {params}) {
        try{
            const {userId} = auth()

            if(!userId){
                return new NextResponse("Unauthenticated" , {status : 401})
            }

            if(!params.signboardId){
                return new NextResponse("signboard Id id is required" , {status : 400})
            }

            const storeByUser = await Prisma.store.findFirst({
                where : {
                    id : params.storeId,
                    userId
                }
            });

            if(!storeByUser){
                return new NextResponse("Unauthrized" , {status : 400})
            }

            const signboard = await Prisma.signboard.deleteMany({
                where : {
                    id : params.signboardId,
                }
            })
            
            return NextResponse.json(signboard)

        }catch(err){
            console.log('[SIGNBOARD_DELETE]' , err);
            return new NextResponse("Internal Error" , {status : 500})
        }
}