"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useRouter , useParams} from "next/navigation";
import { column } from "./columns";
import CellActions from "./cell-action";

const SignboardClient = ({data}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <div className="bg-white w-full p-5 rounded-md shadow-md pb-10">
      <div className="mb-8">
        <Heading title="Signboards" />
        <Button className="mt-5" onClick={() => router.push(`/${params.storeId}/signboards/new`)}>
          <Plus className="w-4 h-4 mr-2 text-white" /> Add New Signboard
        </Button>
      </div>
      <DataTable searchKey="lable" columns={column} data={data} />
    </div>
  );
};

export default SignboardClient;
