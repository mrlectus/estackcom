"use client";
import { OrderTable } from "@/app/drizzle/schema";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { match } from "ts-pattern";

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
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      return (
        <React.Fragment>
          {match(row.original.paymentStatus)
            .with("pending", () => <Badge variant={"secondary"}>Pending</Badge>)
            .with("paid", () => <Badge variant={"outline"}>Paid</Badge>)
            .with("declined", () => (
              <Badge variant={"destructive"}>Declined</Badge>
            ))
            .exhaustive()}
        </React.Fragment>
      );
    },
  },
  {
    accessorKey: "shippingStatus",
    header: "Shipping Status",
    cell: ({ row }) => {
      return (
        <React.Fragment>
          {match(row.original.shippingStatus)
            .with("approved", () => (
              <Badge variant={"secondary"}>approved</Badge>
            ))
            .with("pending", () => <Badge variant={"outline"}>Pending</Badge>)
            .with("shipped", () => <Badge variant={"default"}>Shipped</Badge>)
            .exhaustive()}
        </React.Fragment>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      return new Date(row.original.orderDate).toLocaleDateString();
    },
  },
];
