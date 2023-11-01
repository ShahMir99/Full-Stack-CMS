"use client"

import CellActions from "./cell-action"

export const column = [
    {
        accessorKey : "name",
        header : "Size name"
    },
    {
        accessorKey : "value",
        header : "Size value"
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