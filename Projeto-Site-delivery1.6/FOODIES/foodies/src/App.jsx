import MenuBar from "./components/MenuBar/MenuBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Contact from "./components/pages/Contact/Contact";
import ExploreFood from "./components/pages/ExploreFood/ExploreFood";
import FoodDetails from "./components/pages/FoodDetails/FoodDetails";
FoodDetails;
import { useState } from "react";
import Cart from "./components/pages/Cart/Cart";
Cart
import PlaceOrder from "./components/pages/PlaceOrder/PlaceOrder";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { ToastContainer } from 'react-toastify';


const App = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <MenuBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="food/:id" element={<FoodDetails />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />



      </Routes>
    </div>
  );
};

export default App;
