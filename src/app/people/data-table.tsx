"use client"
import React, { useState } from 'react'
import { columns } from './columns';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
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
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"




interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

export function PeopleDataTable<TData, TValue>({
    columns,
    data,

}:DataTableProps<TData, TValue>){
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([]);
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
   // const [rowSelection, setRowSelection] = useState({});


   const table = useReactTable(
       {
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(),

        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilter,
        onColumnVisibilityChange: setColumnVisibility,
      //   onRowSelectionChange:setRowSelection,

        state:{
         sorting, 
         columnFilters,
         columnVisibility,
         // rowSelection,

        },

        


    });

    return(
      <div className='mx-6'> 
         {/* Input */}
         <div className='flex items-center py-4'>
            <Input
              placeholder='Search by first name' 
              value={table.getColumn('first_name')?.getFilterValue() as string || ""}
              onChange={e =>{
               table.getColumn("first_name")?.setFilterValue(e.target.value);
              }}
              className='max-w-sm'
            />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant='outline'className='ml-auto'>
                     Columns
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align='end'>
                     {table
                        .getAllColumns()
                        .filter(column=>column.getCanHide())
                        .map(column=>{
                        return (
                           <DropdownMenuCheckboxItem  
                              key={column.id} 
                              className='capitalize'
                              checked={column.getIsVisible()}
                              onCheckedChange={(value:boolean)=>{
                                 column.toggleVisibility(!!value)
                              }}
                              
                              >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        )
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         {/* Datatable */}
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
        {/* pagination */}
        <div className='flex item-center justify-end space-x-2 py-4'>
            <Button variant='outline' size='sm' onClick={()=>
               table.previousPage()
            }
            disabled={!table.getCanPreviousPage()}>
               Previous
            </Button>
            <Button variant='outline' size='sm' onClick={()=>
               table.nextPage()
            }
            disabled={!table.getCanNextPage()}>
               Next
            </Button>
        </div>
      </div>
    )
}


export default PeopleDataTable