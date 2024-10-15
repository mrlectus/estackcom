"use client";
import { OrderTable } from "@/app/drizzle/schema";
import { ColumnDef } from "@tanstack/react-table";
import { OrderMenu } from "./action";
import React from "react";
import { Badge } from "@/components/ui/badge";
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
    header: "Product Name",
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
            .with("pending", () => (
              <Badge
                variant={"secondary"}
                className="bg-yellow-600 text-white hover:bg-yellow-500"
              >
                Pending
              </Badge>
            ))
            .with("paid", () => (
              <Badge
                variant={"outline"}
                className="bg-green-600 text-white hover:bg-green-500"
              >
                Paid
              </Badge>
            ))
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
              <Badge
                variant={"secondary"}
                className="bg-green-700 text-white hover:bg-green-500"
              >
                approved
              </Badge>
            ))
            .with("pending", () => (
              <Badge
                variant={"outline"}
                className="bg-yellow-600 text-white hover:bg-yellow-500"
              >
                Pending
              </Badge>
            ))
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
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <OrderMenu id={id} />;
    },
  },
];
