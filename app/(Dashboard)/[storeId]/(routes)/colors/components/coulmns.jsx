"use client"

import CellActions from "./cell-action"

export const column = [
    {
        accessorKey : "name",
        header : "Size name"
    },
    {
        accessorKey : "value",
        header : "Size value",
        cell : ({row}) => (
            <div className="flex items-center gap-5">
            <div className="w-5 h-5 rounded-full border" style={{backgroundColor : row.original.value}}/>
            {row.original.value}
            </div>
        )
    },
    {
        accessorKey : "createdAt",
        header : "Date"
    },
    {
        id : "Action",
        header : "Actions",
        cell : ({row}) => <CellActions data={row.original}/>
    },
]