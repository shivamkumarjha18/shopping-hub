import { Card, CardHeader, CardContent } from "../ui/card";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector(
    (state) => state.shopOrder
  );
  console.log("orderDetails", orderDetails);

  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId);
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Orders history</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Order Id</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Price</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem?._id}>
                  <TableCell className="text-left">
                    {orderItem?._id}
                  </TableCell>
                  <TableCell className="text-left">
                    {orderItem?.orderDate?.split("T")[0]}
                  </TableCell>
                  <TableCell className="text-left">
                    <Badge
                      className={`p-2 border rounded-3xl ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-600"
                          : "bg-black"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">
                    {orderItem?.totalAmount}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() =>
                        handleFetchOrderDetails(orderItem?._id)
                      }
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Single Dialog rendered once */}
      <Dialog
        open={openDetailsDialog}
        onOpenChange={(open) => {
          if (!open) {
            setOpenDetailsDialog(false);
            setSelectedOrderId(null);
            dispatch(resetOrderDetails());
          }
        }}
      >
        {orderDetails && <ShoppingOrderDetailsView  orderDetails={orderDetails} />}
      </Dialog>
    </Card>
  );
}

export default ShoppingOrders;

