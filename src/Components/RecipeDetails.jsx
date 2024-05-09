import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";

const RecipeDetails = ({ mealId, onClose }) => {
  const [mealData, setMealData] = useState(null);


  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.meals);
        setMealData(data.meals[0]); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="recipe-details-cont">
      {mealData && (
        <div className="recipe-info">
          <button className="close-btn" onClick={onClose}>X</button>
          <div className="recipe-container">
            <div className="recipe-info-img">
              <img src={mealData.strMealThumb} alt={mealData.strMeal} className="details-img" />
              <p><span style={{color:'black', fontSize:'20px'}}>Area:   </span> {mealData.strArea}</p>
              <p> <span style={{color:'black', fontSize:'20px'}}>Meal:</span> {mealData.strMeal}</p>
            </div>
            <div className="recipe-video">
              <iframe
                width="200"
                height="315"
                src={`https://www.youtube.com/embed/${mealData.strYoutube.slice(
                  -11
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
  <div className="description">
  <div className="recipe-info-list">
            <ul>
              <h1> Ingredients:</h1>
              <li>{mealData.strIngredient1}</li>
              <li>{mealData.strIngredient2}</li>
              <li>{mealData.strIngredient3}</li>
              <li>{mealData.strIngredient4}</li>
              <li>{mealData.strIngredient5}</li>
            </ul>
          </div>
          <div className="recipe-desc">
            <h1>Instructions</h1>
            <p >{mealData.strInstructions}</p>
          </div>
  </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
