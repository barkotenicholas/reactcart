import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
  isLoading: false,
  error: "",
};

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
      state.quantity = state.quantity-1;
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
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
        state.cartItems[item].cartQuantity = state.cartItems[item].cartQuantity > 1 ? state.cartItems[item].cartQuantity - 1 :state.cartItems.splice(item,1)  ;
      }
    },
    getTotals:(state,action)=>{
        state.total = state.cartItems.reduce((sum,item)=> sum + (parseInt(item.price) * item.cartQuantity),0)
        state.quantity =state.cartItems.reduce((sum,item)=> sum + item.cartQuantity , 0);
    },
    clearAll:(state,action)=>{
      state.cartItems = [];
      state.quantity =0;
      state.total = 0;
    }
  },
});

export const { addToCart ,deleteItemFromCart ,increaseAmount , decreaseAmount ,getTotals,clearAll} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
