import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import cartImg from "../img/empty-cart.png";
import CartItem from "./CartItem";
import { actionType } from "../context/reducer";

const CartContainer = () => {
  const [{ cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);

  const [tot, setTot] = useState(0);

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag, cartItems]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <div className=" w-100rem] h-[30rem]">
      <div className="w-[23rem] mt-2   py-2 px-2 md:w-375 h-[50rem] bg-main drop-shadow-md flex flex-col">
        <div className="w-full flex items-center justify-between p-4 cursor-pointer">
          <motion.div whileTap={{ scale: 0.75 }}>
            <Link to="/menu">
              <MdOutlineKeyboardBackspace className="text-white text-3xl" />
            </Link>
          </motion.div>

          <p className="text-white text-lg font-semibold">My Cart</p>

          <motion.p
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
            onClick={clearCart}
          >
            Clear <RiRefreshFill />
          </motion.p>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="w-full h-full bg-gray-300 rounded-t-[2rem] flex flex-col">
            {cartItems &&
              cartItems.map((item) => <CartItem key={item.id} item={item} />)}
            <div className="w-full flex-1 bg-gray-100 rounded-t[2rem] rounded-b-lg flex flex-col items-center justify-evenly  px-8 py-1">
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-900 text-lg">Sub Total</p>
                <p className="text-gray-900 text-lg">₩ {tot}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-900 text-lg">Delivery</p>
                <p className="text-gray-900 text-lg">₩ 5000</p>
              </div>

              <div className="w-full border-b border-gray-800 my-2"></div>

              <div className="w-full flex items-center justify-between">
                <p className="text-gray-900 text-xl font-semibold">Total</p>
                <p className="text-gray-900 text-xl font-semibold">
                  ₩ {+tot + 5000}
                </p>
              </div>
              {user ? (
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                  className="w-full  p-2 rounded-full bg-main  text-amber text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
                >
                  Check out
                </motion.button>
              ) : (
                <Link to="/">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                    className="w-full  p-4 rounded-full bg-main  text-amber text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
                  >
                    Log in to checkout
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <p className="text-xl text-white textColor font-semibold">
              Your cart is empty
            </p>
            <img src={cartImg} alt="cart" className="w-300" />

            <Link to="/menu">
              <button
                type="button"
                style={{
                  padding: "1rem 3rem",
                  fontSize: "22px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
                className="bg-amber w-[20rem]"
              >
                Add Items
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartContainer;
