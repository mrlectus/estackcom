"use client";
import { estackApi } from "@/app/services";
import { SideView } from "./side-view";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/app/providers/sesssion";

export const SideBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [logout, { isSuccess }] = estackApi.useLogoutMutation();
  const router = useRouter();
  React.useEffect(() => {
    if (isSuccess) {
      router.push("/auth");
    }
  }, [isSuccess, router]);
  const auth = useAuth();
  return (
    <aside className="w-[14rem] p-3 bg-[#F5F5F5] flex flex-col">
      <div className="profile__view border-b p-1">
        <SideView name={auth.user?.username} />
      </div>
      <div className="flex flex-col gap-2 mt-8 justify-between flex-1">
        <div className="menu__item flex flex-col gap-2">{children}</div>
        <div className="logout__">
          <div
            className="flex p-2 gap-2 cursor-pointer"
            onClick={() => logout({})}
          >
            <LogOut className="text-red-500" /> Log Out
          </div>
        </div>
      </div>
    </aside>
  );
};
