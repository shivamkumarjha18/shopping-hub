// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   productList: [],
// };

// export const addNewProduct = createAsyncThunk(
//   "/products/addnewproduct",
//   async (formData) => {
//     const result = await axios.post(
//       "http://localhost:8000/api/admin/products/add",
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return result?.data;
//   }
// );





















// export const fetchAllProducts = createAsyncThunk(
//   "/products/fetchAllProducts",
//   async () => {
//     const result = await axios.get(
//       "http://localhost:8000/api/admin/products/get"
//     );

//     return result?.data;
//   }
// );

// export const editProduct = createAsyncThunk(
//   "/products/editProduct",
//   async ({ id, formData }) => {
//     const result = await axios.put(
//       `http://localhost:8000/api/admin/products/edit/${id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return result?.data;
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "/products/deleteProduct",
//   async (id) => {
//     const result = await axios.delete(
//       `http://localhost:8000/api/admin/products/delete/${id}`
//     );

//     return result?.data;
//   }
// );

// const AdminProductsSlice = createSlice({
//   name: "adminProducts",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.productList = action.payload.data;
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.productList = [];
//       });
//   },
// });

// export default AdminProductsSlice.reducer;









import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/admin/products";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

// 👉 Add New Product
export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/add`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 👉 Fetch All Products
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/get`, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 👉 Edit Product
export const editProduct = createAsyncThunk(
  "adminProducts/editProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/edit/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 👉 Delete Product
export const deleteProduct = createAsyncThunk(
  "adminProducts/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API_URL}/delete/${id}`, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.productList = [];
      })

      // 🔹 Add
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          state.productList.push(action.payload.data);
        }
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 🔹 Edit
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          state.productList = state.productList.map((p) =>
            p._id === action.payload.data._id ? action.payload.data : p
          );
        }
      })

      // 🔹 Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.success) {
          state.productList = state.productList.filter(
            (p) => p._id !== action.meta.arg
          );
        }
      });
  },
});

export default adminProductsSlice.reducer;
