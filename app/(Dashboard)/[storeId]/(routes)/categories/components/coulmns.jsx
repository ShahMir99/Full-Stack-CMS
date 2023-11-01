"use client"

import CellAction from "./cell-action"

export const coulmns = [
    {
        accessorKey : "name",
        header : "Category Name"
    },
    {
        accessorKey : "signboards",
        header : "Signboards"
    },
    {
        accessorKey : "createdAt",
        header : "CreatedAt"
    },
    {
        id : "Actions",
        header : "Actions",
        cell : ({row}) => <CellAction data={row.original}/>
    },
]