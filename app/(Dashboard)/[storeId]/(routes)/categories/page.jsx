import Prisma from "@/lib/prisma-db"
import CategoryClient from "./components/CategoryClient"
import { format } from "date-fns"

export const metadata = {
  title: "Categories",
};

const Categories = async ({params}) => {

  const categories = await Prisma.category.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      signboard : true
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  const formattedCategories = categories.map((item) => ({
    id : item.id,
    name : item.name,
    signboards : item.signboard.lable,
    createdAt : format(item.createdAt , "MMMM do, yyyy")
  }))

  return (
    <div>
      <CategoryClient data={formattedCategories} />
    </div>
  )
}

export default Categories