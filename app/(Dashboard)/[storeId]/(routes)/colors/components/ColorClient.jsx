"use client"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { column } from "./coulmns"

const ColorClient = ({data}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <div className="bg-white w-full p-5 rounded-md shadow-md pb-10">
    <div className="mb-8">
      <Heading title="Colors" />
      <Button className="mt-5" onClick={() => router.push(`/${params.storeId}/colors/new`)}>
        <Plus className="w-4 h-4 mr-2 text-white" /> Add New Color
      </Button>
    </div>
    <DataTable searchKey="name" columns={column} data={data} />
  </div>
  )
}

export default ColorClient