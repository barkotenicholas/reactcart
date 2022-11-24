import React from "react";
import { useDispatch, useSelector } from "react-redux";
import navStyles from "./NavBar.module.css";
import { FiLogOut } from "react-icons/fi";
import { FcShop } from "react-icons/fc";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { signOutUser } from "../../redux/features/loginSlice";
import { auth, signOut } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { clearAll } from "../../redux/features/cartSlice";
import { clearProducts } from "../../redux/features/ProductSlice";
const NavBar = () => {
  const user = useSelector((state) => state.login.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const no = cart.length;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    signOut(auth).then(function () {
      dispatch(signOutUser());
      dispatch(clearAll())
      dispatch(clearProducts())
      navigate("/");
    });
  };

  return (
    <nav className={navStyles.nav}>
      <Link to="/">
        <FcShop className={navStyles.navTitle} size={70} />
      </Link>

      <div className={navStyles.body}>
        <>
          {" "}
          {user && (
            <>
              <Link to="/products " className={navStyles.link}>
                Products{" "}
              </Link>
              <Link to="/about" className={navStyles.link}>
                About Us{" "}
              </Link>
              <Link to="/contact" className={navStyles.link}>
                Contact Us{" "}
              </Link>
              <Link to="/cart" className={navStyles.link}>
                <div className={navStyles.shop}>
                  <BsCart4 />
                  {no > 0 && <span className={navStyles.number}> {no} </span>}
                </div>
              </Link>
              <button onClick={handleClick} className={navStyles.logoutbtn}>
                <FiLogOut />
                LogOut
              </button>
            </>
          )}
        </>
      </div>
    </nav>
  );
};

export default NavBar;
