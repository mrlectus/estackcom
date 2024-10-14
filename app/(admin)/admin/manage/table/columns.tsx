"use client";
import { UserTable } from "@/app/drizzle/schema";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { AdminMenu } from "./action";
import React from "react";
import { match } from "ts-pattern";

export const columns: ColumnDef<UserTable>[] = [
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
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <React.Fragment>
          {match(row.original.role)
            .with("admin", () => <Badge variant={"secondary"}>Admin</Badge>)
            .with("seller", () => <Badge variant={"outline"}>Seller</Badge>)
            .with("shopper", () => <Badge variant={"default"}>Shopper</Badge>)
            .exhaustive()}
        </React.Fragment>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      return <AdminMenu id={id} />;
    },
  },
];
