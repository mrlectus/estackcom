import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderTable } from "./table/order-table";

const Order = () => {
  return (
    <div className="m-3">
      <Card>
        <CardHeader>
          <CardTitle>Order Table</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderTable />
        </CardContent>
      </Card>
    </div>
  );
};
export default Order;
