import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "https://reactauth-9ca0e-default-rtdb.firebaseio.com/Cart.json";

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
  isLoading: false,
  error: "",
  status: "idle",
};

export const fetchAllCart = createAsyncThunk(
  "products/fetchCart",
  async (product) => {
    console.log("fetch data " + product);
    const CARTURL = `https://reactauth-9ca0e-default-rtdb.firebaseio.com/Cart/${product}/Products.json`;
    try {
      const response = await axios.get(CARTURL);
      console.log(response.data);
      let cart = [];

      for (let key in response.data) {
        cart.push({
          cartid:key,
          id: response.data[key].id,
          image: response.data[key].image,
          description: response.data[key].description,
          price: response.data[key].price,
          discount: response.data[key].discount,
          title: response.data[key].title,
          cartQuantity:response.data[key].cartQuantity  
        });
      }
      console.log(cart);
      return cart;
    } catch (error) {
      return error.message;
    }
  }
);
export const addToFirebaseCart = createAsyncThunk(
  "products/addToCart",
  async (product) => {
    console.log(product.userid);
    try {
      const response = axios.post(
        `https://reactauth-9ca0e-default-rtdb.firebaseio.com/Cart/${product.userid}/Products.json`,
        product
      );
      fetchAllCart(product.userid)
      return response.message;
    } catch (error) {}
  }
);
export const deleteFromCart = createAsyncThunk(
  "product/deleteFrom Cart",
  async (product) => {
    try {

      console.log(product);

      const response = await axios.delete(
        `https://reactauth-9ca0e-default-rtdb.firebaseio.com/Cart/${product.userid}/Products/${product.id}.json`
      );

      return response.message
    } catch (error) {}
  }
);
export const updateCartQuantity = createAsyncThunk(
    'cart/incrementCartQuantity',
    async(product)=>{
      const response = await axios.put(
        `https://reactauth-9ca0e-default-rtdb.firebaseio.com/Cart/${product.userid}/Products/${product.id}/cartQuantity.json`, 
          product.newcartquantity 
        )
    }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteCart",
  async (product) => {
    try {
        const response = await axios.delete(`https://reactauth-9ca0e-default-rtdb.firebaseio.com/Cart/${product.userid}/Products/${product.id}.json`)
      
        return response.status;
    } catch (error) {}
  }
);
export const decreaseCartQuantity = createAsyncThunk(
  'cart/incrementCartQuantity',
  async(product)=>{
    const response = await axios.put(
      `https://reactauth-9ca0e-default-rtdb.firebaseio.com/Cart/${product.userid}/Products/${product.id}/cartQuantity.json`, 
        product.newcartquantity 
      )
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => {
      state.cartItems = [];
    },
    addToCart: (state, action) => {
      const item = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (item >= 0) {
        state.cartItems[index].cartQuantity += 1;
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.quantity += 1;
        state.cartItems.push(temp);
      }
    },
    deleteItemFromCart: (state, action) => {
      state.quantity = state.quantity - 1;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    increaseAmount: (state, action) => {
      const item = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (item >= 0) {
        state.cartItems[item].cartQuantity += 1;
      }
    },
    decreaseAmount: (state, action) => {
      const item = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (item >= 0) {
        state.cartItems[item].cartQuantity =
          state.cartItems[item].cartQuantity > 1
            ? state.cartItems[item].cartQuantity - 1
            : state.cartItems.splice(item, 1);
      }
    },
    getTotals: (state, action) => {
      state.total = state.cartItems.reduce(
        (sum, item) => sum + parseInt(item.price) * item.cartQuantity,
        0
      );
      state.quantity = state.cartItems.reduce(
        (sum, item) => sum + item.cartQuantity,
        0
      );
    },
    clearAll: (state, action) => {
      state.cartItems = [];
      state.quantity = 0;
      state.total = 0;
      state.status='idle';
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchAllCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllCart.fulfilled, (state, action) => {
        state.status = "succeed";
        state.cartItems = action.payload;
      }).addCase(deleteFromCart.fulfilled,(state,action)=>{
        state.status = 'idle';
      }).addCase(addToFirebaseCart.fulfilled,(state,action)=>{
        state.status = 'idle';
      }).addCase(updateCartQuantity.fulfilled,(state,action)=>{
        state.status ='idle';
      }).addCase(deleteProduct.fulfilled,(state,action)=>{
        state.status = 'idle';
      })
  },
});

export const {
  addToCart,
  deleteItemFromCart,
  increaseAmount,
  decreaseAmount,
  getTotals,
  clearAll,
} = cartSlice.actions;

export const getAllCartItems = (state) => state.cart?.cartItems;
export const getCartStatus = (state) => state.cart?.status;
export const getCartError = (state) => state.cart?.error;


const cartReducer = cartSlice.reducer;
export default cartReducer;
