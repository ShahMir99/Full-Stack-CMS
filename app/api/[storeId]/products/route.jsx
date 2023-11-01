import Prisma from "@/lib/prisma-db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST(req , {params}){
    try{

        const {userId} = auth()
        const body = await req.json()
        const {
            name,
            price,
            actualPrice,
            description,
            stock,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived
        } = body;


        if(!userId){
            return new NextResponse("Unauthenticated" , {status : 401})
        }

        if(!name){
            return new NextResponse("Name is Required" , {status : 400})
        }

        if(!description){
            return new NextResponse("Description is Required" , {status : 400})
        }

        if(!stock){
            return new NextResponse("Stock is Required" , {status : 400})
        }

        if(!price){
            return new NextResponse("Price is Required" , {status : 400})
        }

        if(!actualPrice){
            return new NextResponse("actualPrice is Required" , {status : 400})
        }
        if(!categoryId){
            return new NextResponse("categoryId is Required" , {status : 400})
        }
        if(!colorId){
            return new NextResponse("ColorId is Required" , {status : 400})
        }
        if(!sizeId){
            return new NextResponse("SizeId is Required" , {status : 400})
        }
        if(!images || !images.length){
            return new NextResponse("Images is Required" , {status : 400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is Required" , {status : 400})
        }

        const storeByUser = await Prisma.store.findFirst({
            where : {
              id :   params.storeId
            }
        })


        if(!storeByUser){
            return new NextResponse("Unauthorized" , {status : 403})
        }

        const product = await Prisma.product.create({
            data : {
                name,
                description,
                stock,
                price,
                actualPrice,
                images : {
                    createMany : {
                        data : [
                            ...images.map((image) => image)
                        ]
                    }
                },
                storeId : params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,

            }
        })
        
            return NextResponse.json(product)

    }catch(err){
        console.log(err)
        return new NextResponse("Internal server error" , {status : 500})
    }
}