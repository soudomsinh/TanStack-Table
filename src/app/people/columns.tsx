'use client'
import { Person } from "@/people";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Person>[] = [
    
    {
        header: "PersonID",
        accessorKey: "id"
    },
    {
        header: "First Name",
        accessorKey: "first_name"
    },
    {
        header: "Last Name",
        accessorKey: "last_name"
    },
    {
        header: "Email",
        accessorKey: "email"
    },
    {
        header: "Gender",
        accessorKey: "gender"
    },
    {
        header: "Date of birth",
        accessorKey: "date_of_birth",
        cell: ({ row }) => {
            const date_of_birth = row.getValue("date_of_birth");
            const formattedDate = format(new Date(date_of_birth as string), 'dd/MM/yyyy');
            return <div className="font-medium">{formattedDate}</div>;
        }
    },
    {
        id: "actions",
        cell: ({row})=>{
           const person = row.original
           const personId = person.id
           

        }
    }
]