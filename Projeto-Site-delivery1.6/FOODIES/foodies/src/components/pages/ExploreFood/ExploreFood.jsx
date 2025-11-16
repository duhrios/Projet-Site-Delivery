import React, { useState } from "react";
import FoodDisplay from "../../FoodDisplay/FoodDisplay";


const ExploreFood = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <> 
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group mb-3">
              <select
                className="form-select mt-2"
                style={{ maxWidth: "150px" }}
                
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">Todas</option>
                 <option value="Pizzas">Pizzas</option>
                  <option value="Refeições">Refeições</option>
                  <option value="Vegetariana">Vegetariana</option>
                  <option value="Hambúrgueres">Hambúrgueres</option>
                  <option value="Bolos">Bolos</option>
                  <option value="Sorvetes">Sorvetes</option>
                  <option value="Refrigerantes">Refrigerantes</option>

                  <option value="Alcoólicas">Alcoólicas</option>
                
              </select>
              <input type="text" className="form-control mt-2" placeholder="Procure seu prato preferido..." onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
              <button className="btn btn-primary mt-2" type="submit" ><i className="bi bi-search"></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FoodDisplay category={category}  searchText={searchText}/>
    </>
  );
};

export default ExploreFood;
