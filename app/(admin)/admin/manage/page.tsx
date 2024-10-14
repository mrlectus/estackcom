import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UsersTable } from "./table/user-table";
import { UsersForm } from "./form/user-form";

const ManageUsers = async () => {
  return (
    <main className="flex p-4 flex-col gap-10">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Users</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Users</DialogTitle>
            </DialogHeader>
            <UsersForm />
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Users Table</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ManageUsers;
