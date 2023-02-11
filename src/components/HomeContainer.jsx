import React from "react";
import { Link } from "react-router-dom";
import delivery from "../img/delivery.png";
import onlineDelivery from "../img/food-order-3.png";

const HomeContainer = () => {
  /*   let fromLang = "en";
  let toLang = "no"; // translate to norwegian
  let text = "something to translate";

  const API_KEY = [YOUR_API_KEY];

  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  url += "&q=" + encodeURI(text);
  url += `&source=${fromLang}`;
  url += `&target=${toLang}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("response from google: ", response);
    })
    .catch((error) => {
      console.log("There was an error with the translation request: ", error);
    }); */

  return (
    <>
      <section className="grid  grid-cols-1 md:grid-cols-2 gap-2 w-full">
        <div className="py-2 flex-1 flex flex-col items-start  justify-center gap-6">
          <div className="flex items-center gap-2 justify-center bg-darkGreen px-4 py-1 rounded ">
            <p className="text-base text-primary font-semibold">Delivery</p>
            <div className="w-8 h-8 bg-white rounded-full drop-shadow-xl overflow-hidden">
              <img
                src={delivery}
                alt="deliver"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-[2rem] homeRes  lg:text-[3.5rem] sm:text-center md:text-left font-bold tracking-wide text-white">
            The Fastest Halal Delivery in{" "}
            <span className="text-[2rem] lg:text-[3.5rem] text-amber">
              Jeonju
            </span>
          </p>
          <p className="text-base text-white text-center md:text-left md:w-[80%]">
            Restaurant food, takeaway and groceries.Delivered straight out of
            the oven to your doorstep. <br />
            Want a delicious meal, but no time? Alright, we will deliver it hot
            and yummy.
          </p>

          <Link
            to="/menu"
            className="md:w-auto m-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
          >
            <button
              type="button"
              className="bg-amber text-main w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
              style={{ fontWeight: "bold", fontSize: "1.25rem" }}
            >
              Order Now
            </button>
          </Link>
        </div>
        <div className="p-2 flex-1 items-center">
          <img
            src={onlineDelivery}
            className=" ml-auto h-340 rounded md:h-370"
            alt="onlineDelivery"
          />
        </div>
      </section>
    </>
  );
};

export default HomeContainer;
