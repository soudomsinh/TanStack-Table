"use client"
import React from 'react'
import { columns } from './columns';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

export function PeopleDataTable<TData, TValue>({
    columns,
    data,

}:DataTableProps<TData, TValue>){
    const table = useReactTable(
       {
        data,
        columns,
        getCoreRowModel:getCoreRowModel()
    });

    return(
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup =>{
                        return(
                           <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map(header =>{
                                 return(
                                    <TableHead key={header.id}>
                                       {flexRender(
                                          header.column.columnDef.header, 
                                          header.getContext()
                                       )}
                                    </TableHead>
                                 )
                              })}
                           </TableRow>
                        )
                    })}
                </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length?(
                    table.getRowModel().rows.map(row =>(
                        <TableRow key={row.id}>
                           {row.getVisibleCells().map(cell=>(
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))

                  ):(
                      <TableRow>
                        <TableCell className="h-24 text-center">
                          No result
                        </TableCell>
                      </TableRow>
                    )
                  }
               </TableBody>
            </Table>
        </div>
    )
}


export default PeopleDataTable