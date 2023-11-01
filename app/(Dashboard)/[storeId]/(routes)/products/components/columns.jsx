"use client";
import Image from "next/image";
import  CellActions  from "./cell-action";

export const column = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-[50px] w-[50px]">
        <Image
          fill
          src={row.original.image}
          alt=""
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "actualPrice",
    header: "Actual Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "featured",
    header: "Featured",
  },
  {
    accessorKey: "archived",
    header: "Archived",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell : (({row}) => (
      <div className="w-5 h-5 rounded-full border" style={{backgroundColor : row.original.color}} />
    ))
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
