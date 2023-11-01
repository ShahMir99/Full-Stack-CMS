import Prisma from "@/lib/prisma-db"
import CategoryForm from "./components/CategoryForm"


const CategoryId = async ({params}) => {

    const category = await Prisma.category.findFirst({
        where : {
            id : params.categoryId
        }
    })

    const signboards = await Prisma.signboard.findMany({
        where : {
            storeId : params.storeId
        }
    })

  return (
    <div className="flex-1">
        <CategoryForm initialData={category} signboards={signboards}/>
    </div>
  )
}

export default CategoryId