import React from "react";
import ProductClient from "./components/ProductClient";
import Prisma from "@/lib/prisma-db";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

export const metadata = {
  title: "Products",
};

const Products = async ({params}) => {

  const products = await Prisma.product.findMany({
      where : {
        storeId : params.storeId
      },
      include : {
        category : true,
        size : true,
        color : true,
        images : true
      },
      orderBy : {
        createdAt : "desc"
      }
  })


  const formattedColumn = products.map((item) => ({
    id : item.id,
    image : item.images[0].url,
    name : item.name,
    price : formatter.format(item.price),
    actualPrice : formatter.format(item.actualPrice),
    stock : item.stock,
    featured : item.isFeatured,
    archived : item.isArchived,
    category : item.category.name,
    size : item.size.value,
    color : item.color.value,
    createdAt : format(item.createdAt , "MMMM do, yyyy")

  }))

  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4">
        <ProductClient data={formattedColumn}/>
      </div>
    </div>
  );
};

export default Products;
