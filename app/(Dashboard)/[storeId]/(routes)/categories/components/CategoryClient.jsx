"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { coulmns } from "./coulmns";

const CategoryClient = ({ data }) => {

    const params = useParams()
    const router = useRouter()

  return (
    <div className="bg-white space-y-8 flex flex-col shadow-md rounded-md p-5 pb-10">
      <div className="flex-col space-y-5">
        <Heading title="Categories" />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="w-4 h-4 mr-4" />
          Add category
        </Button>
      </div>
      <DataTable searchKey="name" data={data} columns={coulmns}/>
    </div>
  );
};

export default CategoryClient;
