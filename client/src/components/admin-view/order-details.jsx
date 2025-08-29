import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import CommonForm from "../common/form";
import { Separator } from "../ui/separator";
import { useState } from "react";

const initialFormData = {
    status: "",
};

function AdminOrderDetailsView(){


    const [formData,setFormData]=useState(initialFormData)

function handleUpdateStatus(event){
   event.preventDefault();
}
    return (
    <DialogContent  className="sm:max-w-[6000px]">
<div className="grid gap-6">
    <div className="grid gap-2">
<div className="flex items-center justify-between mt-2">
<p className="font-medium">Order ID</p>
<Label>123456</Label>
</div>
<div className="flex items-center justify-between mt-2">
<p className="font-medium">Order Date </p>
<Label>27 Aug 2025</Label>
</div>
<div className="flex items-center justify-between mt-2">
<p className="font-medium">Order Status </p>
<Label>in process</Label>
</div>
<div className="flex items-center justify-between mt-2">
<p className="font-medium">Order price </p>
<Label>$200</Label>
</div>
<Separator></Separator>
<div className="grid gap-4">
<div className="grid gap-2">
<div className="font-medium">Order Details</div>
<ul className="grid gap-3">
    <li className="flex items-center justify-between">
        <span>Product one </span>
        <span>$100</span>
    </li>
</ul>
</div>
</div>
<div className="grid gap-4">
   <div className="grid gap-2">
    <div className="font-medium">Shipping Info</div>
    <div className="grid gap-0.5 text-muted-foreground">
        <span>john doy</span>

<span>Address</span>
<span>City</span>
<span>Pincode</span>
<span>Phone</span>
<span>Notes</span>
    </div>
    </div> 
</div>

<div>
    <CommonForm  formControls={[
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
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
    ></CommonForm>
</div>
    </div>
</div>
    </DialogContent>
    );
}

export default AdminOrderDetailsView;