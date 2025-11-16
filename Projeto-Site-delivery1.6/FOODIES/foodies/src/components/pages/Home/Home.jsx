import { useState } from "react";
import Header from "../../Header/Header";
import ExploreMenu from "../../ExploreMenu/ExploreMenu";
Header;
import FoodDisplay from '../../FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <main className="container">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} searchText={''}/>
    </main>
  );
};

export default Home;
