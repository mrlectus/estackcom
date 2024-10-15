"use client";
import { estackApi } from "@/app/services";
import { CountCard } from "@/components/count-card";

const SellerDashboard = () => {
  const product = estackApi.useGetUserProductQuery();
  const order = estackApi.useGetSellerOrderQuery();
  return (
    <main className="flex p-4">
      <div className="md:flex gap-3">
        <CountCard
          text1={"Total Order"}
          text2={"Sale Count"}
          loading={order.isLoading}
          count={order.data?.length ? order.data.length : 0}
        />
        <CountCard
          text1={"Total Product Count"}
          text2={"product Count"}
          count={product.data?.length ? product.data.length : 0}
          loading={product.isLoading}
        />
      </div>
    </main>
  );
};

export default SellerDashboard;
