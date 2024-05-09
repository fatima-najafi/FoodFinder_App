import React, { useState, useEffect } from "react";
import Recipe from "../src/Components/Recipe";
import Header from "./Components/Header";
import "./style.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [inputData, setInputData] = useState("American");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRecipe();
  }, [inputData]);

  const getRecipe = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${inputData}`
    );
    const data = await response.json();
    if (data.meals) {
      setRecipes(data.meals);
      setMessage(""); 
    } else {
      setRecipes([]); // Clear recipes array if no recipes found
      setMessage("Sorry, we don't have recipes from your selected area.");
    }
  };

  //  search
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setInputData(search);
    setSearch("");
  };

  return (
    <>
      <Header />
      <div className="app">
        <form className="input-search" onSubmit={getSearch}>
          <label htmlFor="search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>
          <input
            type="text"
            className="search-bar"
            name="search"
            id="search"
            placeholder="Search your favorite area's food"
            value={search}
            onChange={updateSearch}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        {message && <p className="no-food">{message}</p>}
        <div className="recipe_list">
          {recipes.map((recipe) => (
            <Recipe key={recipe.idMeal} item={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
