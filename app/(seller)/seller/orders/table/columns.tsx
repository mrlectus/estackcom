"use client";
import { OrderTable, ProductTable } from "@/app/drizzle/schema";
import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ProductMenu } from "./action";

export const columns: ColumnDef<OrderTable>[] = [
  {
    id: "serial",
    header: "#",
    cell: ({ row }) => row.index + 1, //RDT provides index by default
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <span>{formatCurrency(row.original.price)}</span>;
    },
  },
  {
    accessorKey: "stock",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <ProductMenu id={id} />;
    },
  },
];
