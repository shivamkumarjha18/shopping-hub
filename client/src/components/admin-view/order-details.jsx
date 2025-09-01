import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast.success(data?.payload?.message);
      } else {
        toast.error("Failed to update order status");
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[500px] rounded-xl">
      <div className="space-y-4 text-sm">
        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{orderDetails?._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span>{orderDetails?.orderDate.split("T")[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Price</span>
            <span>${orderDetails?.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment</span>
            <span>{orderDetails?.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Status</span>
            <span>{orderDetails?.paymentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Order Status</span>
            <Badge
              className={`px-2 py-0.5 text-xs capitalize ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-gray-600"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div>
          <h3 className="font-medium mb-2 text-sm">Order Details</h3>
          <ul className="space-y-1">
            {orderDetails?.cartItems?.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between text-xs border-b pb-1"
              >
                <span>{item.title}</span>
                <span>Qty: {item.quantity}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Info */}
        <div>
          <h3 className="font-medium mb-2 text-sm">Shipping Info</h3>
          <div className="text-xs text-gray-600 space-y-0.5">
            <p>{user?.userName}</p>
            <p>{orderDetails?.addressInfo?.address}</p>
            <p>{orderDetails?.addressInfo?.city}</p>
            <p>{orderDetails?.addressInfo?.pincode}</p>
            <p>{orderDetails?.addressInfo?.phone}</p>
            <p>{orderDetails?.addressInfo?.notes}</p>
          </div>
        </div>

        {/* Update Status */}
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
