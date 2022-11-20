import React from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteItemFromCart,
  increaseAmount,
  decreaseAmount,
  getTotals,
  clearAll,
} from "../../redux/features/cartSlice";
import styles from "./cart.module.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = useSelector((state) => state.cart.total);
  const quantity = useSelector((state) => state.cart.quantity);
  const clearAllCart = () =>{
    dispatch(clearAll())
  }
  const dispatch = useDispatch();

  let content;
  if(cartItems.length === 0){
    content= <p>No Cart items</p>
  }

  return (
    <>
      <h2 className={styles.head}>Cart</h2>
      <br />
      <div className={styles.top}>
        <div>
          <p>Total</p>
          <p>{total}</p>
        </div>
        <div>
          <p>Total Items</p>
          <p>{quantity}</p>
        </div>

        <div>
          <p>Clear All Items</p>
          <FaTrashAlt className={styles.delete} size={30} onClick={clearAllCart} />
        </div>
      </div>
      <div>
        {cartItems.length > 0 ?
          cartItems.map((item) => (
            <div className={styles.card}>
              <img className={styles.img} src={item.image} alt="as" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className={styles.addDelete}>
                <FaPlusCircle
                  className={styles.add}
                  onClick={() => {
                    dispatch(increaseAmount(item));
                    dispatch(getTotals());
                  }}
                />
                <span> {item.cartQuantity}</span>
                <FaMinusCircle
                  className={styles.delete}
                  onClick={() => {
                    dispatch(decreaseAmount(item));
                    dispatch(getTotals());
                  }}
                />
              </div>
              <FaTrashAlt
                className={styles.delete}
                size={30}
                onClick={() => {
                  dispatch(deleteItemFromCart(item));
                  dispatch(getTotals());
                }}
              />
            </div>
          )) :
                <p className={styles.nocart} >No cart Items</p>
          }
      </div>
    </>
  );
};

export default Cart;
