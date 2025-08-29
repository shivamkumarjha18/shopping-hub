
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import CommonForm from "../common/form";
import { Separator } from "../ui/separator";
import { useState } from "react"; 


function ShoppingOrderDetailsView(){
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


    </div>
</div>
    </DialogContent>
)
}
export default ShoppingOrderDetailsView;