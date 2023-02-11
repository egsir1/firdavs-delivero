import React, { useEffect } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContainer from "./components/HomeContainer";
import CreateContainer from "./components/CreateContainer";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./firebaseFunctions";
import { actionType } from "./context/reducer";
import MenuContainer from "./components/MenuContainer";
import CartContainer from "./components/CartContainer";
import Footer from "./components/Footer";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      console.log(data);
      console.log(foodItems, "77");
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CartProvider>
      <AnimatePresence>
        <Router>
          <div className="w-screen h-auto flex flex-col">
            <Header />
          </div>
          <main className=" mt-14 md:mt-20 px-4 md:px-16 py-6 w-full bg-main">
            <Routes>
              <Route exact path="/" element={<MainContainer />} />
              <Route exact path="/createItem" element={<CreateContainer />} />
              <Route exact path="/menu" element={<MenuContainer />} />
              <Route exact path="/cart-container" element={<CartContainer />} />
            </Routes>
          </main>
          <div>
            <Footer />
          </div>
        </Router>
        {/*  <MenuContainer /> */}
      </AnimatePresence>
    </CartProvider>
  );
};

export default App;
