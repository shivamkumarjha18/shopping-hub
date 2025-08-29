import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { CardContent } from "../ui/card";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
// Removed unnecessary dispatch import
import { useDispatch } from "react-redux"; // Added correct import
// Removed fetchAllProducts import as it's not needed here

function ShoppingProductTile({ product , handleGetProductDetails,handleAddtoCart}) {
  const dispatch = useDispatch(); // Kept for future cart actions if needed

  // No useEffect needed here as data is passed via props
  // If you need to dispatch cart actions later, add useEffect accordingly

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product._id)} >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="object-cover w-full h-[300px] rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 right-2">
            
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {product?.brand}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
        
        </CardFooter>
      </div>
        <Button onClick={() => handleAddtoCart(product?._id)}>
            Add to Cart
          </Button>
    </Card>
  );
}

export default ShoppingProductTile;