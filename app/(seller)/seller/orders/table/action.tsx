"use cleint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { estackApi } from "@/app/services";
import React from "react";
import { match } from "ts-pattern";
import { useToast } from "@/hooks/use-toast";
import { QueryStatus } from "@reduxjs/toolkit/query";

export const OrderMenu = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [shipProduct, { status }] = estackApi.useShipOrderByIdMutation();
  React.useEffect(() => {
    match(status)
      .with(QueryStatus.rejected, () =>
        toast({
          title: "Error",
          description: "Cannot ship product",
          variant: "destructive",
        }),
      )
      .with(QueryStatus.fulfilled, () =>
        toast({
          title: "Success",
          description: "Product has been marked as shipped",
        }),
      )
      .otherwise(() => null);
  }, [toast, status]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => shipProduct({ id })}>
          Ship
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
