import Prisma from "@/lib/prisma-db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function PATCH(req , {params}){
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

        if(!params.productId){
            return new NextResponse("Product Id id is Required" , {status : 400})
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

        await Prisma.product.update({
            where : {
                id : params.productId
            },
            data : {
                name,
                description,
                stock,
                price,
                actualPrice,
                images : {
                    deleteMany : {}
                },
                storeId : params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,

            }
        })

        const Product = await Prisma.product.update({
            where : {
                id : params.productId
            },
            data : {
                images : {
                    createMany : {
                        data : [
                            ...images.map((image) => image)
                        ]
                    }
                }
            }
        })
        
            return NextResponse.json(Product)

    }catch(err){
        console.log("[PRODUCT_PATCH]", err);
        return new NextResponse("Internal server error" , {status : 500})
    }
}

export async function DELETE(req,{params}) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!params.productId) {
        return new NextResponse("productId id is required", { status: 400 });
      }
  
      const storeByUser = await Prisma.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        },
      });
  
      if (!storeByUser) {
        return new NextResponse("Unauthrized", { status: 400 });
      }
  
      const product = await Prisma.product.deleteMany({
        where: {
          id: params.productId,
        },
      });
  
      return NextResponse.json(product);
    } catch (err) {
      console.log("[PRODUCT_DELETE]", err);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }