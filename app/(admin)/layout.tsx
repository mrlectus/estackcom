import { redirect } from "next/navigation";
import React from "react";
import { validateRequest } from "../lib/lucia";
import { NavBar } from "@/components/navbar";
import { SideBar } from "@/components/sidebar";
import { MenuItem } from "@/components/menuitem";
import { LayoutDashboard, User } from "lucide-react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth");
  }
  if (user.role !== "admin") {
    return redirect("/");
  }
  return (
    <React.Fragment>
      <div className="flex h-screen w-screen">
        <SideBar>
          <MenuItem to="/admin" text="DashBoard" icon={<LayoutDashboard />} />
          <MenuItem to="/admin/manage" text="Manage" icon={<User />} />
        </SideBar>
        <div className="flex flex-col flex-1">
          <NavBar />
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
