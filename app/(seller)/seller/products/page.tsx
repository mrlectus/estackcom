import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "./form/product-form";
import { ProductTable } from "./table/product-table";
const SellerProduct = async () => {
  return (
    <main className="flex p-4 flex-col gap-10">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product to your store!</DialogTitle>
            </DialogHeader>
            <ProductForm />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Product Table</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SellerProduct;
