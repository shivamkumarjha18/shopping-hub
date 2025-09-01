import ProductFilter from "@/components/shopping-view/filter";
import { sortOptions } from "@/config";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { ArrowUpDownIcon } from "lucide-react";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

function ShoppingListing() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList, isLoading, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(
    localStorage.getItem("shoppingSort") || "price-low-high"
  );
  const [isOpen, setIsOpen] = useState(false);

  // Initialize and sync filters with searchParams
  const [filters, setFilters] = useState({
    category: searchParams.get("category") ? [searchParams.get("category")] : [],
    brand: searchParams.get("brand") ? [searchParams.get("brand")] : [],
    search: searchParams.get("search") || "",
  });

  const normalize = useCallback(
    (val) => (val || "").toString().toLowerCase().trim(),
    []
  );

  // Update filters when searchParams changes
  useEffect(() => {
    setFilters({
      category: searchParams.get("category")
        ? [searchParams.get("category")]
        : [],
      brand: searchParams.get("brand") ? [searchParams.get("brand")] : [],
      search: searchParams.get("search") || "",
    });
  }, [searchParams]);

  const filteredProductList = [...(productList || [])]
    .filter((product) => {
      const category = normalize(product.category);
      const brand = normalize(product.brand);
      const title = normalize(product.title);
      const search = normalize(filters.search);

      const categoryMatch =
        !filters.category.length ||
        filters.category.some((c) => category === normalize(c));
      const brandMatch =
        !filters.brand.length ||
        filters.brand.some((b) => brand === normalize(b));
      const searchMatch = !search || title.includes(search);

      return categoryMatch && brandMatch && searchMatch;
    })
    .sort((a, b) => {
      if (!sort) return 0;
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      switch (sort) {
        case "price-low-high":
          return priceA - priceB;
        case "price-high-low":
          return priceB - priceA;
        case "title-atoz":
          return a.title.localeCompare(b.title);
        case "title-ztoa":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  const handleAddtoCart = (productId, totalStock) => {
    if (!user?.id) {
      toast.error("Please log in to add items to the cart");
      return;
    }
    const getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === productId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
          toast.error(
            `Only ${getQuantity} quantity can be added for this item`
          );
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast.success("Product added to cart");
      } else {
        toast.error("Failed to add product to cart");
      }
    });
  };

  const handleSort = (value) => {
    setSort(value);
    setIsOpen(false);
    localStorage.setItem("shoppingSort", value);
  };

  const handleFilter = (sectionId, option) => {
    const normalizedOption = normalize(option);
    setFilters((prev) => {
      const current = prev[sectionId] || [];
      const newSelections = current.includes(normalizedOption)
        ? current.filter((id) => id !== normalizedOption)
        : [...current, normalizedOption];
      const updated = { ...prev, [sectionId]: newSelections };

      const newSearchParams = new URLSearchParams(searchParams);
      if (sectionId === "search") {
        if (newSelections.length) {
          newSearchParams.set(sectionId, newSelections[0]);
        } else {
          newSearchParams.delete(sectionId);
        }
      } else {
        if (newSelections.length) {
          newSearchParams.set(sectionId, newSelections[0]);
        } else {
          newSearchParams.delete(sectionId);
        }
      }

      setSearchParams(newSearchParams);
      return updated;
    });
  };

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, filters, sort]);

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-white dark:bg-gray-800 w-full rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
            All Products
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 dark:text-gray-400">
              {isLoading
                ? "Loading..."
                : `${filteredProductList.length} Products`}
            </span>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
                className="flex items-center gap-1 text-gray-700 dark:text-gray-300"
              >
                <ArrowUpDownIcon className="h-4 w-4" />
                <span>
                  {sort
                    ? `Sort: ${
                        sortOptions.find((s) => s.id === sort)?.label
                      }`
                    : "Sort by"}
                </span>
              </Button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                  {sortOptions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSort(s.id)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {filteredProductList.length > 0 ? (
            filteredProductList.map((product) => (
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
                key={product.id || product._id}
                product={product}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              {isLoading
                ? "Loading products..."
                : "No products match the selected filters."}
            </p>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
