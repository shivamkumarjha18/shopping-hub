import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[800px]">
      <div className="space-y-6">
        {/* Order Info */}
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>

            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>

            <p className="font-medium">Order Status</p>
            <Badge
              className={`p-2 border rounded-3xl ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>

            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>

            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="space-y-2">
          <div className="font-medium">Order Details</div>
          <ul className="space-y-2">
            {orderDetails?.cartItems &&
              orderDetails?.cartItems.length > 0 &&
              orderDetails?.cartItems.map((item, index) => (
                <li
                  key={index}
                  className="grid grid-cols-3 gap-2 text-sm border-b pb-1"
                >
                  <span>Title: {item.title}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                </li>
              ))}
          </ul>
        </div>

        <Separator />

        {/* Shipping Info */}
        <div className="space-y-2">
          <div className="font-medium">Shipping Info</div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <span>Name:</span>
            <span>{user?.userName}</span>

            <span>Address:</span>
            <span>{orderDetails?.addressInfo?.address}</span>

            <span>City:</span>
            <span>{orderDetails?.addressInfo?.city}</span>

            <span>Pincode:</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>

            <span>Phone:</span>
            <span>{orderDetails?.addressInfo?.phone}</span>

            <span>Notes:</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
