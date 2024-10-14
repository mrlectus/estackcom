"use client";
import { estackApi } from "@/app/services";
import { CountCard } from "@/components/count-card";

const AdminDashboard = () => {
  const { data, isLoading } = estackApi.useGetAllUsersQuery();
  return (
    <main className="flex p-4">
      <div className="md:flex gap-3">
        <CountCard
          text1={"All Users"}
          count={data?.length ? data.length : 0}
          loading={isLoading}
        />
        <CountCard
          text1={"Shoppers"}
          count={
            data?.length
              ? data.filter((user) => user.role === "shopper").length
              : 0
          }
          loading={isLoading}
        />
        <CountCard
          text1={"Sellers"}
          count={
            data?.length
              ? data.filter((user) => user.role === "seller").length
              : 0
          }
          loading={isLoading}
        />
        <CountCard
          text1={"Admin"}
          count={
            data?.length
              ? data.filter((user) => user.role === "admin").length
              : 0
          }
          loading={isLoading}
        />
      </div>
    </main>
  );
};

export default AdminDashboard;
