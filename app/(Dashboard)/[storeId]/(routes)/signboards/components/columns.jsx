"use client";
import Image from "next/image";
import  CellActions  from "./cell-action";

export const column = [
  {
    accessorKey: "imageUrl",
    header: "Images",
    cell: ({ row }) => (
      <div className="relative h-[50px] w-[50px]">
        <Image
          fill
          src={row.original.imageUrl}
          alt=""
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "lable",
    header: "Lable",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "Actions",
    id: "Actions",
    cell: ({row}) => <CellActions data={row.original}/>
  }
];
