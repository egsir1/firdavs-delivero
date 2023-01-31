import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
let items = [];
const CartItem = ({ item, setFlag, flag }) => {
  const [qty, setQty] = useState(item.qty);
  //const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));

    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, cartItems]);
  return (
    <div
      key={item.id}
      className="w-full bg-gray-300  px-6 py-3 flex flex-col gap-3 "
    >
      <div className=" w-full p-1 px-2 rounded-lg bg-gray-100 flex items-center gap-2">
        <img
          src={item?.imageURL}
          className="w-20 h-20 max-w-[60px] rounded-full object-contain"
          alt="pz"
        />

        <div className="flex flex-col gap-2">
          <p className="text-base text-gray-900">{item?.title}</p>
          <p className="text-sm block text-gray-900">
            ₩ {parseFloat(item?.price) * qty}
          </p>
        </div>

        <div className="group flex items-center gap-2 ml-auto cursor-pointer">
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty("remove", item?.id)}
          >
            <BiMinus className="text-gray-900" />
          </motion.div>

          <p className=" w-5 h-5 rounded-full bg-gray-200 text-gray-900 flex items-center justify-center">
            {qty}
          </p>

          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQty("add", item?.id)}
          >
            <BiPlus className="text-gray-900" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
