import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchText }) => {


  const { foodList } = useContext(StoreContext);

  console.log("Categoria selecionada:", category);
  console.log("Comidas disponíveis:", foodList.map(f => ({ nome: f.name, categoria: f.category })));
   

 const filteredFoods = foodList.filter(food =>(  
   (  category === 'All' || food.category === category) &&  food.name.toLowerCase().includes(searchText.toLowerCase())

  ));

  return (
    <div className="container">
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem key={food.id}
             name={food.name}
              description={food.description}
               id={food.id}
               imageUrl={food.image || food.imageUrl}
               
               price={food.price}
               />
          ))
        ) : (
          <div className="text-center mt-4">
            <h4>Nenhum prato encontrado.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;