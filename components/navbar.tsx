"use client";

import { usePathname } from "next/navigation";
import { match } from "ts-pattern";

export const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="p-2 h-[5rem] border-b flex items-center">
      <div className="text-xl font-bold tracking-wide">
        {match(pathname)
          .with("/seller", () => "Dashboard")
          .with("/admin", () => "Dashboard")
          .with("/seller/products", () => "Products")
          .with("/admin/manage", () => "Users Management")
          .otherwise(() => null)}
      </div>
    </nav>
  );
};
