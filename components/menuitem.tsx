"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const MenuItem = ({
  icon,
  text,
  to,
}: {
  icon: React.ReactNode;
  text: string;
  to: string;
}) => {
  const pathname = usePathname();
  console.log("path", pathname);
  return (
    <div
      className={clsx("p-1 rounded-md", {
        "bg-[#FF6600]/50 p-1 text-[#FF6600]": pathname === to,
        "opacity-65": pathname !== to,
      })}
    >
      <Link href={to} className="flex items-center gap-2 font-bold">
        <div>{icon}</div>
        <div>{text}</div>
      </Link>
    </div>
  );
};
