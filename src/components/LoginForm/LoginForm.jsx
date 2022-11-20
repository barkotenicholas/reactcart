import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, signInWithEmailAndPassword } from "../../firebase";
import { login } from "../../redux/features/loginSlice";
import { useNavigate } from "react-router-dom";
import loginStyles from "./Login.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const user = useSelector((state) => state.login);

  if (!user) {
    navigate("/products");
  }
  const [formValues, setFormValues] = useState(initialValues);

  const [validEmail, setValidEmail] = useState(null);
  const [validPassword, setValidPassword] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.info(formValues.email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      setValidEmail("Email Invalid");
      return;
    } else {
      setValidEmail(null);
    }
    if (!validatePassword()) {
      setValidPassword("Password Invalid");
      return;
    } else {
      setValidEmail(null);
    }
    if (validateEmail() && validatePassword()) {
      loginUser();
    }
  };

  function loginUser() {
    signInWithEmailAndPassword(auth, formValues.email, formValues.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const values = {
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
        };
        dispatch(login(values));
        navigate("/products");
      })
      .catch((error) => {
        const errorCode = error.code;
        setLoginError(error.message);
      });
  }

  function validatePassword() {
    console.info();
    return PWD_REGEX.test(formValues.password);
  }
  function validateEmail() {
    return EMAIL_REGEX.test(formValues.email);
  }

  return (
    <div className={loginStyles.body}>
      <h4 className={loginStyles.formTitle}>Login Here</h4>
      <form className={loginStyles.formBody} onSubmit={handleSubmit}>
        {loginError && <p className={loginStyles.textError}>{loginError}</p>}
        <div className={loginStyles.formRow}>
          <label className={loginStyles.label}>Email:</label>
          <input
            className={loginStyles.input}
            name="email"
            placeholder="Input email"
            value={formValues.email}
            onChange={handleChange}
          ></input>
          {validEmail && (
            <p className={loginStyles.textError}>
              Invalid Email format please input a valid one
            </p>
          )}
        </div>
        <div className={loginStyles.formRow}>
          <label className={loginStyles.label}>Password:</label>
          <input
            type="password"
            className={loginStyles.input}
            name="password"
            placeholder="Input pass"
            value={formValues.password}
            onChange={handleChange}
          ></input>
          {validPassword && (
            <p className={loginStyles.textError}>
              Password must contain a symbol , Uppercase , Lowercase and number
            </p>
          )}
        </div>

        <input type="submit" value="Login" className={loginStyles.submit} />
      </form>
    </div>
  );
};

export default LoginForm;
