import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrackingTable } from "./table/tracking-table";

const TrackOrder = () => {
  return (
    <main className="bg-[#f6f6f9] w-screen min-h-screen p-3 mt-20">
    <Card>
    <CardHeader>
    <CardTitle>Track Order</CardTitle>
    </CardHeader>
    <CardContent>
    <TrackingTable/>
    </CardContent>
    </Card>
    </main>
  );
};

export default TrackOrder;
