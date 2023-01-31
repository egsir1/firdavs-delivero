import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("mixed");

  const [{ foodItems }, dispatch] = useStateValue();

  useEffect(() => {}, [filter]);
  return (
    <section className="w-full mt-0 my-6 bg-main ">
      <div className="w-full flex flex-col items-center justify-content">
        <p
          className="text-3xl font-semibold capitalize
           text-white relative before:absolute before: rounded-lg
       "
          style={{ marginTop: "2rem", marginBottom: "5rem" }}
        >
          Our Hot Dishes
        </p>
        <div
          className="w-full flex items-center justify-start lg:justify-center gap-8 py-6
         bg-main overflow-x-scroll scrollbar-none"
        >
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlPathName ? "bg-amber" : "bg-gray-300"
                } w-24 min-w-[94px] h-28 cursor-pointer
                 rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center 
                  hover:bg-amber `}
                onClick={() => setFilter(category.urlPathName)}
              >
                <div
                  className="w-10 h-10 rounded-full shadow-lg bg-gray-900 group-hover:bg-gray-800
                 flex items-center justify-center"
                >
                  <IoFastFood className="text-gray-200 group-hover:bg-gray-800 text-lg" />
                </div>

                <p
                  style={{ fontWeight: "bold", fontSize: "20px" }}
                  className="text-sm text-gray-900 group-hover:text-gray-900"
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full ">
          <RowContainer
            flag={false}
            data={foodItems?.filter((n) => n.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
