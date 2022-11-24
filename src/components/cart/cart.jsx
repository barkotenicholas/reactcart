import React, { useEffect } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../../redux/features/cartSlice";
import ReactLoading from "react-loading";

import {
  getAllCartItems,
  getCartError,
  getCartStatus,
  fetchAllCart,
  deleteFromCart,
  decreaseCartQuantity,
  updateCartQuantity,
} from "../../redux/features/cartSlice";
import { getTotals } from "../../redux/features/cartSlice";

import styles from "./cart.module.css";

const Cart = () => {
  const user = useSelector((state) => state.login.user);

  const cartItems = useSelector(getAllCartItems);
  const cartStatus = useSelector(getCartStatus);
  const error = useSelector(getCartError);

  const total = useSelector((state) => state.cart.total);
  const quantity = useSelector((state) => state.cart.quantity);

  const clearAllCart = () => {
    dispatch(clearAll());
    dispatch(getTotals())
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartStatus === "idle") {
      if (user) {
        dispatch(fetchAllCart(user.id));
        dispatch(getTotals())
      }
    }
  });

  let c;
  if (cartStatus === "loading") {
    c = (
      <div className={styles.loading}>
        <ReactLoading
          type="spin"
          color="#0000FF"
          height={100}
          width={100}
          className={styles.loading}
        />
      </div>
    );
  } else if (cartStatus === "succeed") {
    dispatch(getTotals())
    if (cartItems.length !== 0) {
      c = cartItems.map((cart) => (
        <div className={styles.card} key={cart.id}>
          <img className={styles.img} src={cart.image} alt="as" />
          <div className={styles.body}>
            <h3>{cart.title}</h3>
            <p>{cart.description}</p>
          </div>
          <div>
            <p>{cart.price} $</p>
            <p className={styles.discount}>{cart.discount} % off</p>
          </div>
          <div className={styles.addDelete}>
            <FaPlusCircle
              className={styles.add}
              onClick={() => {
                const quantity = cart.cartQuantity + 1;
                const a = {
                  userid: user.id,
                  id: cart.cartid,
                  newcartquantity: quantity,
                };
                console.log(a);
                dispatch(updateCartQuantity(a));
              }}
            />
            <span> {cart.cartQuantity}</span>
            <FaMinusCircle
              className={styles.delete}
              onClick={() => {
                if (cart.cartQuantity > 1) {
                  const quantity = cart.cartQuantity - 1;
                  const a = {
                    userid: user.id,
                    id: cart.cartid,
                    newcartquantity: quantity,
                  };
                  dispatch(updateCartQuantity(a));
                }
              }}
            />
          </div>
          <FaTrashAlt
            className={styles.delete}
            size={30}
            onClick={() => {
              const a = {
                userid: user.id,
                id: cart.cartid,
              };
              dispatch(deleteFromCart(a));
            }}
          />
        </div>
      ));
    } else {
      c = <p className={styles.center}> There are no Cart Items</p>;
    }
  } else if (cartStatus === "failed") {
    c = <p>{error}</p>;
  }

  let content;
  if (cartItems.length === 0) {
    content = <p>No Cart items</p>;
  }

  return (
    <>
      <h2 className={styles.head}>Cart</h2>
      <br />
      <div className={styles.top}>
        <div className={styles.topInfo}>
          <p>Total</p>
          <p>{total}</p>
        </div>
        <div className={styles.topInfo}>
          <p>Total Items</p>
          <p>{quantity}</p>
        </div>

        <div className={styles.topInfo}>
          <p>Clear All Items</p>
          <FaTrashAlt
            className={styles.delete}
            size={30}
            onClick={clearAllCart}
          />
        </div>
      </div>
      <div>
        {c}
        {/* {cartItems.length > 0 ? (
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
          ))
        ) : (
          <p className={styles.nocart}>No cart Items</p>
        )} */}
      </div>
    </>
  );
};

export default Cart;
