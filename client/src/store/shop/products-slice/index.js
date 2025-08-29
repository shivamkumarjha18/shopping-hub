import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Added axios import

const API_URL = "http://localhost:8000/api/shop/products";

const initialState = {
  isLoading: false,
  productList: [],
productDetails:null
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "Products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/get`, {
        withCredentials: true,
      });
      console.log("API Response:", data); // Debug API response
      return data;
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message); // Debug error
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchProductDetails = createAsyncThunk(
  "Products/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/get/${productId}`, {
        withCredentials: true,
      });
      console.log("API Response:", data); // Debug API response
      return data;
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message); // Debug error
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Check if action.payload has a 'data' key
        state.productList = action.payload.data || action.payload || [];
        console.log("Updated productList:", state.productList); // Debug state update
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.productList = [];
        console.error("Rejected with error:", action.payload); // Debug error
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.productDetails = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data || action.payload || null;
        console.log("Updated productDetails:", state.productDetails); // Debug state update
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.productDetails = null;
        console.error("Rejected with error:", action.payload); // Debug error
      });
  },
});

export default shoppingProductSlice.reducer;