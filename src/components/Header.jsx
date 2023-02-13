import React, { useState } from "react";
//import Logo from "../img/halal.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import Avatar from "../img/ava2.png";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const [{ user, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu((prevState) => !prevState);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <div className="fixed z-50 w-screen bg-hex p-6 px-6 md:p-6 md:px-16 h-20">
      {/*desktop*/}
      <div className="hidden md:flex w-full h-full items-center">
        <div className="flex items-center gap-2">
          {/*  <img
            src={Logo}
            className="w-22 object-cover  "
            style={{ borderRadius: "8px" }}
            alt="logo"
          /> */}
          <Link to="/">
            <p className="text-amber  text-xl font-bold">Firdavs delivero</p>
          </Link>
        </div>

        <ul className="flex items-center gap-8 ml-auto">
          <div
            style={{
              background: "#e9ecf0",
              padding: "0.25rem 1rem",
              borderRadius: "8px",
            }}
          >
            <li className="text-base text-hex hover:text-deliveroo duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
          </div>
          <div
            style={{
              background: "#e9ecf0",
              padding: "0.25rem 1rem",
              borderRadius: "8px",
            }}
          >
            <li className="text-base text-hex hover:text-deliveroo duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
          </div>
          <div
            style={{
              background: "#e9ecf0",
              padding: "0.25rem 1rem",
              borderRadius: "8px",
            }}
          >
            <li className="text-base text-hex hover:text-deliveroo duration-100 transition-all ease-in-out cursor-pointer">
              About us
            </li>
          </div>
          <div
            style={{
              background: "#e9ecf0",
              padding: "0.25rem 1rem",
              borderRadius: "8px",
            }}
          >
            <li className="text-base text-hex hover:text-deliveroo duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </div>
        </ul>
        <div className="relative flex items-center justify-center">
          <Link to="/cart-container">
            <MdShoppingBasket
              className="cursor-pointer text-2xl ml-8"
              style={{ color: "#b2edb4", fontSize: "26px" }}
            />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-red-800 flex items-center justify-center ">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </Link>
        </div>
        <div className="relative">
          <motion.img
            onClick={login}
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            style={{
              borderRadius: "50%",
              marginLeft: "2rem",

              background: "transparent",
            }}
            className="w-8 h-7 min-w-[20px] cursor-pointer rounded-full"
            alt="profilePic"
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="bg-gray-700 w-40 shadow-xl rounded-lg flex flex-col absolute top-10 right-0 px-4 py-2"
              style={{ color: "white" }}
            >
              {user && user.email === "egsir111@gmail.com" && (
                <Link to="/createItem">
                  <p
                    className="px-4 py-2 flex flex-center gap-3 cursor-pointer
             hover:bg-slate-100 hover:text-textColor trasition-all duration-100 ease-in-out "
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd style={{ marginTop: "0.25rem" }} />
                  </p>
                </Link>
              )}
              <p
                className="px-4 py-2 flex flex-center gap-3 cursor-pointer 
            hover:bg-slate-100 hover:text-textColor trasition-all duration-100 ease-in-out "
                onClick={logout}
              >
                Logout <MdLogout style={{ marginTop: "0.25rem" }} />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/*mobile*/}

      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <Link to="/cart-container">
            <MdShoppingBasket
              className="cursor-pointer text-2xl"
              style={{
                color: "#b2edb4",
                fontSize: "26px",
                marginBottom: "2rem",
              }}
            />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber flex items-center justify-center ">
                <p className="text-xs text-gray-800 font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </Link>
        </div>
        {/*    <div className="google-t" id="google_translate_element"></div> */}

        <Link to="/" className="flex items-center gap-2">
          <p
            style={{ marginBottom: "2rem", marginLeft: "2rem" }}
            className="text-amber text-[1.8rem] font-bold"
          >
            Firdavs delivero
          </p>
        </Link>

        <div className="relative " style={{ marginBottom: "2rem" }}>
          <motion.img
            onClick={login}
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            style={{
              borderRadius: "50%",
              marginLeft: "2rem",

              background: "transparent",
            }}
            className="w-7 h-6 max-w-[25px] cursor-pointer rounded-full"
            alt="profilePic"
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="bg-gray-700 w-40 shadow-xl rounded-lg flex flex-col absolute top-10 right-0 px-4 py-2"
              style={{ color: "white" }}
            >
              {user && user.email === "egsir111@gmail.com" && (
                <Link to="/createItem">
                  <p
                    className="px-4 py-2 flex flex-center gap-3 cursor-pointer
             hover:bg-slate-100 hover:text-textColor trasition-all duration-100 ease-in-out "
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd style={{ marginTop: "0.25rem" }} />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col  ">
                <div
                /*   style={{
                    background: "#e9ecf0",
                    padding: "0.25rem 1rem",
                    borderRadius: "8px",
                  }} */
                >
                  <li
                    className="text-slate-100 cursor-pointer px-4 py-2
                  hover:bg-slate-100 hover:text-textColor trasition-all duration-100 ease-in-out"
                    onClick={() => setIsMenu(false)}
                  >
                    Home
                  </li>
                </div>
                <div
                /*   style={{
                    background: "#e9ecf0",
                    padding: "0.25rem 1rem",
                    borderRadius: "8px",
                  }} */
                >
                  <li
                    className="text-base text-slate-100 cursor-pointer px-4 py-2
                  hover:bg-slate-100 hover:text-textColor trasition-all duration-100 ease-in-out"
                    onClick={() => setIsMenu(false)}
                  >
                    Menu
                  </li>
                </div>
                <div
                /*   style={{
                    background: "#e9ecf0",
                    padding: "0.25rem 1rem",
                    borderRadius: "8px",
                  }} */
                >
                  <li
                    className="text-base text-slate-100 cursor-pointer px-4 py-2
                  hover:bg-slate-100 hover:text-textColor trasition-all duration-100 ease-in-out"
                    onClick={() => setIsMenu(false)}
                  >
                    About us
                  </li>
                </div>
                <div
                /*      style={{
                    background: "#e9ecf0",
                    padding: "0.25rem 1rem",
                    borderRadius: "8px",
                  }} */
                >
                  <li
                    className="text-base text-slate-100  cursor-pointer px-4 py-2
                  hover:bg-slate-100 hover:text-textColor trasition-all duration-100 ease-in-out"
                    onClick={() => setIsMenu(false)}
                  >
                    Service
                  </li>
                </div>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-lg text-red-300 flex flex-center justify-center gap-3 cursor-pointer
            hover:bg-gray-800 hover:text-red-700 trasition-all duration-100 ease-in-out "
                onClick={logout}
              >
                Logout <MdLogout style={{ marginTop: "0.25rem" }} />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
