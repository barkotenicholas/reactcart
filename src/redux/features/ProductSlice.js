import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://reactauth-9ca0e-default-rtdb.firebaseio.com/Products.json";
const initialState = {
  allProducts: [],
  status: "idle", 
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts ",
  async () => {
    try {
      const response = await axios.get(URL);
      let data = [];

      for (let key in response.data) {
        data.push({
          id: key,
          image: response.data[key].image,
          description: response.data[key].description,
          price: response.data[key].price,
          discount: response.data[key].discount,
          title: response.data[key].title,
        });
      }

      console.log(data);

      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/fetchProducts",
  async (product) => {
    try {
      console.info(product);
      const response = await axios.post(URL, product);
      return response.message;
    } catch (err) {}
  }
);

export const deleteProduct = createAsyncThunk(
  "products/fetchProducts",
  async (product) => {
    try {
        const response = await axios.delete(`https://reactauth-9ca0e-default-rtdb.firebaseio.com/Products/${product.userid}.json`)
        fetchProducts()
        return response.status;
    } catch (error) {}
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts:(state,action)=>{
      state.allProducts = []
      state.status= 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeed";

        state.allProducts = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }).addCase(deleteProduct.fulfilled,(state,action)=>{
        state.status = "idle";  
      });
  },
});

export const getProductsStatus = (state) => state.product?.status;
export const getProductsError = (state) => state.product?.error;
export const getAllProducts = (state) => state.product?.allProducts;

export const {clearProducts} = productSlice.actions;

const postReducer = productSlice.reducer;
export default postReducer;
