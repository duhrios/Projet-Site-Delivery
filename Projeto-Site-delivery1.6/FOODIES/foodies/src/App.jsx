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
import MyOrders from "./components/pages/MyOrders/MyOrders";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";



const App = () => {
  const [category, setCategory] = useState("All");
  const {token} = useContext(StoreContext);

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
        <Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
        
        <Route path="/login" element={token ? <Home /> : <Login />} />

        <Route path="/register" element={token ? <Home /> : <Register />} />

         <Route path="/meuspedidos" element={token ? <MyOrders /> : <Login />} />



      </Routes>
    </div>
  );
};

export default App;
