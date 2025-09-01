
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState, useRef } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import ProductDetailsDialog from "./product-details"; // Import the dialog component

// ---------------- MENU ITEMS ----------------
function MenuItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults = [], isLoading = false } = useSelector((state) => state.shopSearch || {});
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold selected product
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim()) {
        dispatch(getSearchResults(searchText.trim()));
        setIsSearchDropdownOpen(true);
      } else {
        dispatch(resetSearchResults());
        setIsSearchDropdownOpen(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchText, dispatch]);

  // Handle navigation for menu items
  function handleNavigate(getCurrentMenuItem) {
    const currentFilters = {
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      search: searchText || "",
    };

    const newSearchParams = new URLSearchParams();

    if (getCurrentMenuItem.id === "home") {
      navigate("/shopping/home");
      return;
    }

    if (getCurrentMenuItem.id === "products") {
      if (currentFilters.search) newSearchParams.set("search", currentFilters.search);
      navigate(`/shopping/listing?${newSearchParams.toString()}`);
      return;
    }

    newSearchParams.set("category", getCurrentMenuItem.id.toLowerCase());
    if (currentFilters.brand) newSearchParams.set("brand", currentFilters.brand);
    if (currentFilters.search) newSearchParams.set("search", currentFilters.search);

    navigate(`/shopping/listing?${newSearchParams.toString()}`);
  }

  // Handle search input change
  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchText(value);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      newSearchParams.set("search", value.trim());
    } else {
      newSearchParams.delete("search");
    }
    navigate(`/shopping/listing?${newSearchParams.toString()}`, { replace: true });
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle clicking a search result
  function handleSearchResultClick(productId) {
    const product = searchResults.find((result) => result._id === productId);
    if (product) {
      setSelectedProduct(product); // Set the selected product
      setIsSearchDropdownOpen(false); // Close the dropdown
      setSearchText(""); // Clear the search input
      dispatch(resetSearchResults()); // Reset search results
      // No navigation needed; dialog will handle display
    }
  }

  return (
    <div className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row relative">
      {shoppingViewHeaderMenuItems
        .filter((item) => item.id !== "search")
        .map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer hover:text-blue-600"
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        ))}
      {/* Search Box */}
      <div className="relative">
        <input
          ref={searchInputRef}
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="ml-4 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Search Results Dropdown */}
        {isSearchDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-4 top-10 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {isLoading ? (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <div
                  key={result._id}
                  onClick={() => handleSearchResultClick(result._id)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {result.title || result.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
            )}
          </div>
        )}
        {/* Product Details Dialog */}
        <ProductDetailsDialog
          open={!!selectedProduct}
          setOpen={(open) => !open && setSelectedProduct(null)}
          productDetails={selectedProduct}
        />
      </div>
    </div>
  );
}

// ---------------- HEADER RIGHT CONTENT ----------------
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Cart Drawer */}
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm bg-red-500 text-white px-1 rounded-full">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      {/* User Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="flex items-center gap-2 rounded-full bg-black text-white p-2"
        >
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </button>

        {openDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              Logged in as{" "}
              <span className="font-semibold">{user?.userName}</span>
            </div>
            <button
              onClick={() => {
                navigate("/shopping/account");
                setOpenDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <UserCog className="h-4 w-4" />
              Account
            </button>
            <button
              onClick={() => {
                handleLogout();
                setOpenDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------- MAIN HEADER ----------------
function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shopping" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Desktop Right Content */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;