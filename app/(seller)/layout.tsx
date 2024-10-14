import { NavBar } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";
import React from "react";
import { validateRequest } from "../lib/lucia";
import { redirect } from "next/navigation";
import { MenuItem } from "@/components/menuitem";
import { CreditCard, LayoutDashboard, ShoppingCart } from "lucide-react";

export default async function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth");
  }
  if (user.role !== "seller") {
    return redirect("/");
  }
  return (
    <React.Fragment>
      <div className="flex h-screen w-screen">
        <SideBar>
          <MenuItem to="/seller" text="DashBoard" icon={<LayoutDashboard />} />
          <MenuItem
            to="/seller/products"
            text="Products"
            icon={<ShoppingCart />}
          />
          <MenuItem to="/seller/orders" text="Orders" icon={<CreditCard />} />
        </SideBar>
        <div className="flex flex-col flex-1">
          <NavBar />
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
