import React from "react";
import styles from "./Single.module.css";
import { FaCartPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart ,getTotals } from "../../redux/features/cartSlice";
import {
  deleteProduct,
  fetchProducts,
} from "../../redux/features/ProductSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const handleClick = () => {
    const item = cartItems.findIndex((item) => item.id === product.id);
    if (item >= 0) {
      toast.info("Product already added to cart", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      dispatch(addToCart(product));
      dispatch(getTotals());

      toast.success("Added to cart", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleDelete = () => {
    dispatch(fetchProducts());
    dispatch(deleteProduct(product));
    dispatch(fetchProducts());
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardmedia}>
        <img
          className={styles.cardimg}
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.body}>{product.description}</p>
        <p>{product.price}$</p>
      </div>
      <div className={styles.cardfooter}>
        <FaCartPlus
          onClick={handleClick}
          className={styles.carticon}
          size={20}
        />
      </div>
      <FaTrashAlt className={styles.delete} size={30} onClick={handleDelete} />
      <ToastContainer />
    </div>
  );
};

export default SingleProduct;
