import React, { useEffect, useState } from "react";
import { IoBagAddSharp } from "react-icons/io5";
import AddProduct from "./AddProduct";
import styles from "./product.module.css";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

import {
  getAllProducts,
  getProductsStatus,
  getProductsError,
  fetchProducts,
} from "../../redux/features/ProductSlice";
import SingleProduct from "./SingleProduct";

const Products = () => {
  const dispatch = useDispatch();

  const productsStaus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const productsDetails = useSelector(getAllProducts);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    dispatch(fetchProducts());
  };

  useEffect(() => {
    if (productsStaus === "idle") {
      dispatch(fetchProducts());
    }
  });

  let content;
  if (productsStaus === "loading") {
    content = (
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
  } else if (productsStaus === "succeed") {
    if (productsDetails.length !== 0) {
      content = productsDetails.map((product) => (
        <SingleProduct
          key={product.id}
          product={product}
          className={styles.center}
        />
      ));
    } else {
      content = <p className={styles.center}> There are no Products</p>;
    }
  } else if (productsStaus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <div className={styles.head}>
        <button className={styles.addbtn} onClick={() => setIsOpen(true)}>
          <IoBagAddSharp />
          Add Product
        </button>
      </div>
      <div className={styles.allproducts}>
        <div>{content}</div>
      </div>
      {isOpen && <AddProduct setIsOpen={setIsOpen} handleClose={handleClose} />}
    </>
  );
};

export default Products;
