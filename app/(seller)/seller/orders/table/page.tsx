import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductTable } from "./product-table";

const Order = () => {
  return (<div>
          <Card>
            <CardHeader>
              <CardTitle>Order Table</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductTable />
            </CardContent>
          </Card>
        </div>)
}
export default Order;
