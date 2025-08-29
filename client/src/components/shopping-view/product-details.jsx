import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
function ProductDetailsDialog({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-6 p-6 sm:p-8 max-w-[80vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white dark:bg-gray-900 rounded-lg">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={400}
            height={400}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{productDetails?.title}</h1>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
            </div>
            <span className="text-xs text-muted-foreground">(4.3)</span>
          </div>

          <div className="flex items-center gap-3">
            {productDetails?.salePrice > 0 ? (
              <>
                <p className="text-base font-medium text-gray-500 line-through">
                  {productDetails?.price}
                </p>
                <p className="text-base font-medium text-red-600">
                  {productDetails?.salePrice}
                </p>
              </>
            ) : (
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                {productDetails?.price}
              </p>
            )}
          </div>

          <div>
            <Button className="w-full">Add to Cart</Button>
          </div>
          <Separator />

          <div className="max-h-[200px] overflow-auto">
            <h2 className="text-lg font-medium mb-3">Reviews</h2>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex-col  items-center gap-2">
                        <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
              <StarIcon className="w-4 h-4 fill-yellow-400" />
            </div>
                    <h3 className="text-sm font-medium">Shivam Kumar Jha</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is an awesome Product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input placeholder="Write a review..." />
              <Button variant="outline">Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;