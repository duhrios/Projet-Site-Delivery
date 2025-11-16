import  { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
     const [token, setToken] = useState("");

   const [foodList, setFoodList] = useState([]);

   const [quantities, setQuantities] = useState({});

   const increaseQty = (foodId) => {
   setQuantities((prev) => ({...prev, [foodId]: (prev[foodId] || 0 )+1,}));

   };

   const decreaseQty = (foodId) => {
   setQuantities((prev) => ({...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] -1 : 0}))
    
   };

   const removeFromCart = (foodId) => {
    setQuantities((prevQuantities) => {
    const updatedQuantities ={...prevQuantities
    };
    delete updatedQuantities[foodId];
    return updatedQuantities;
   });
   };
  
  const fetchFoodList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/foods');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar comida:', error);
      return [];
    }
  };

   const contextValue = {
      foodList,
      increaseQty,
      decreaseQty,
      quantities,
      removeFromCart,
      token,
      setToken,
      setQuantities,
      
   };

   useEffect(() => {
     async function loadData(){
    
    const data = await fetchFoodList();
    {/* console.log("Dados recebidos da API:", data) */}
    setFoodList(data);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
      }
      loadData();
   }, []);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};