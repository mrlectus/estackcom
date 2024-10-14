import React from "react";
import { validateRequest } from "../lib/lucia";
import { redirect } from "next/navigation";
import { ShopNav } from "@/components/shopnav";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth");
  }
  return (
    <React.Fragment>
      <ShopNav />
      {children}
    </React.Fragment>
  );
}
