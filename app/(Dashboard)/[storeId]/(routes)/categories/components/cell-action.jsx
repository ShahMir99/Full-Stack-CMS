"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

const CellAction = ({data}) => {

  const {toast} = useToast()
  const router = useRouter()
  const params = useParams()

  const onCopy = (id) => {
    navigator.clipboard.writeText(id)
    toast({
      variant : "success",
      title : "Sucess",
      description : "Id copied successfully"
    })
  }

  const onDelete = async () => {
    try{
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
      router.refresh()
      toast({
        variant : "success",
        title : "Category deleted successfully",
      })
    
    }catch(err){
      console.log()
      toast({
        variant : "destructive",
        title : "Warning",
        description : "Please delete all products using this category"
      })
    }
  }

  return (
    <>
<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 outline-none  border-none"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => onCopy(data.id)}
          className="hover:bg-blue-50"
        >
          <Copy className="mr-2 w-4 h-4" />
          Copy id
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-blue-50"
          onClick={() =>
            router.push(`/${params.storeId}/categories/${data.id}`)
          }
        >
          <Edit className="mr-2 w-4 h-4" />
          update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="hover:bg-blue-50">
          <Trash className="mr-2 w-4 h-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}

export default CellAction