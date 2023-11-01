import Prisma from "@/lib/prisma-db"
import SignboardForm from "./components/SignboardForm"

const SignboardId = async ({params}) => {

  const signboard = await Prisma.signboard.findUnique({
    where : {
      id : params.signboardId
    }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pb-10 bg-white rounded-md shadow-md">
        <SignboardForm initialData={signboard}/>
      </div>
    </div>
  )
}

export default SignboardId