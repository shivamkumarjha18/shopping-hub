import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import AdminOrderDetailsView from "./order-details";
import { useState } from "react";
function AdminOrder() {
const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Order Id</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Price</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-left">#12345</TableCell>
              <TableCell className="text-left">Pending</TableCell>
              <TableCell className="text-left">29 Aug 2025</TableCell>
              <TableCell className="text-left">$200</TableCell>
              <TableCell className="text-center">
                <Dialog open={openDetailsDialog}  onOpenChange={setOpenDetailsDialog}>
                  <Button onClick={() => setOpenDetailsDialog(true)}>View Details</Button>
                  <AdminOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrder;
