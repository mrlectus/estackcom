"use client";
import { Skeleton } from "@/components/ui/skeleton";

import { estackApi } from "@/app/services";
import { match } from "ts-pattern";
import { DataTable } from "@/components/table";
import { columns } from "./columns";

export const TrackingTable = () => {
  const { data, isLoading } = estackApi.useTrackOrderQuery();
  return (
    <div>
      <div>
        {match(isLoading)
          .with(true, () => {
            return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
          })
          .with(false, () => {
            return <DataTable data={data? data : []} columns={columns} />;
          })
          .exhaustive()}
      </div>
    </div>
  );
};
