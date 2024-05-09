import React, { useState } from "react";
import "./Recipe.css";
import RecipeDetails from "./RecipeDetails";

const Recipe = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleClose = () => {
    setShowDetails(false); // Close the details view
  };

  return (
    <>
      {!showDetails && (
        <div className="recipe">
          <img src={props.item.strMealThumb} alt={props.item.strMeal} className="recipe-img" />
          <h1 className="recipe-title">{props.item.strMeal}</h1>
          <button className="recipe-btn" onClick={toggleDetails}>
            See more details
          </button>
        </div>
      )}
      {showDetails && <RecipeDetails mealId={props.item.idMeal} onClose={handleClose} />}
    </>
  );
};

export default Recipe;
