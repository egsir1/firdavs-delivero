import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { categories } from "../data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CreateContainer = () => {
  const [title, setTitle] = useState("");

  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCatogory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);

  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading : Try again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(true);
          setMsg("Image uploaded successfully.");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
            setIsLoading(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully.");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields can not be empty");

        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try again.");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setImageAsset("");
    setCalories("");
    setPrice("");
    setCalories("");
    setCatogory("Select Category");
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-800 rounded-lg p-4 flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full m-1 py-2 border-b bg-gray-200 border-gray-300 flex items-center gap-2">
          <MdFastfood
            className="text-xl
            text-gray-700"
            style={{ color: "#03162e" }}
          />

          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg rounded bg-gray-200 font-semibold outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCatogory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Catogory
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlPathName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted
         border-gray-300 mt-2 w-full h-225 md:h-420 cursor-pointer bg-gray-200 rounded-lg"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full ">
                    <img
                      src={imageAsset}
                      alt="uploade"
                      className="w-full h-full  object-cover"
                    />
                    <div
                      className="action"
                      style={{
                        marginRight: "5rem",
                        background: "red",
                        width: "115%",
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        marginTop: "0.5rem",
                      }}
                    >
                      <button
                        type="button"
                        className=" absolute bottom-1 right-0 bg-red-500 p-4 
                      rounded-full  text-xl cursor-pointer
                       outline-none hover:shadow-md duration-500 
                       transition-all ease-in-out"
                        onClick={deleteImage}
                      >
                        <MdDelete style={{ color: "white" }} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-2 mt-2 ">
          <div className="w-full py-2 bg-gray-200 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-xl" />
            <input
              type="text"
              required
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full h-full text-lg bg-transparent  outline-none border-none  "
            />
          </div>
          <div className="w-full py-2 border-b bg-gray-200 border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-xl" />
            <input
              type="text"
              required
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full text-lg bg-transparent  outline-none border-none  "
            />
          </div>
        </div>
        <div className="flex items-center w-full mt-2">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full lg:w-auto border-none outline-none bg-amber px-12 py-2 rounded-lg text-lg text-main font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
