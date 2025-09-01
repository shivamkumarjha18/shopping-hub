import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductsSlice from "./admin/products-slice/index.js"
import  shoppingProductSlice from "./shop/products-slice/index.js"
import shopAddressSlice from "./shop/address-slice";
import  shoppingCartSlice from "./shop/cart-slice/index.js"
import shopOrderSlice from "./shop/order-slice";
import  adminOrderSlice from "./admin/order-slice"
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shoppingProductSlice,
    shopCart: shoppingCartSlice,
 shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
   adminOrder:adminOrderSlice,
   shopSearch: shopSearchSlice,
       
   shopReview: shopReviewSlice,
  },
});



export default store;