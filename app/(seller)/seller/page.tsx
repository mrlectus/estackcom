"use client";
import { estackApi } from "@/app/services";
import { CountCard } from "@/components/count-card";

const SellerDashboard = () => {
  const { data, isLoading } = estackApi.useGetUserProductQuery();
  return (
    <main className="flex p-4">
      <div className="md:flex gap-3">
        <CountCard text1={"Total Order"} text2={"Sale Count"} count={200} />
        <CountCard
          text1={"Total Product Count"}
          text2={"product Count"}
          count={data?.length ? data.length : 0}
          loading={isLoading}
        />
      </div>
    </main>
  );
};

export default SellerDashboard;
