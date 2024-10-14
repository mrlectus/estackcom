"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/app/providers/sesssion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ShoppingBasket } from "lucide-react";
import { CartItem } from "./cart-item";
import { SummaryCard } from "./summary-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { estackApi } from "@/app/services";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ShopNav = () => {
  const user = useAuth();
  const [logout, { isSuccess }] = estackApi.useLogoutMutation();
  const { toast } = useToast();
  const router = useRouter();
  React.useEffect(() => {
    if (isSuccess) {
      toast({
        description: "You have been logged out successfully",
      })
      router.push("/auth")
    }
  }, [isSuccess])
  return (
    <nav className="h-20 flex fixed inset-0 z-50 bg-white justify-between items-center p-3 border-b drop-shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold border-4 p-2 border-black">
          e<span className="text-orange-600">Stack</span>
        </div>
        <div className="text-2xl font-bold">
          Welcome Back, @<span>{user.user?.username}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <ShoppingBasket />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Shopping Cart</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full justify-between">
              <div className="flex gap-4 flex-col p-2 overflow-y-scroll">
                <CartItem />
              </div>
              <div className="flex gap-4 p-2 justify-between flex-col">
                <SummaryCard />
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>ES</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="flex flex-col gap-2 p-2">
            <Button variant={"ghost"} asChild><Link href={"/order/track"}>Track Order</Link></Button>
            <Button variant={"destructive"} onClick={() => logout({})}>Logout</Button>
          </div>
        </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
