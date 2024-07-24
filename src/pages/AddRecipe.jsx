import { useState } from "react";

const AddRecipe = () => {
  const [name, setName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      name: name,
      cuisineType: cuisineType,
      recipeImage: imageLink,
      ingredients: ingredients.split("\n"),
      instructions: instructions.split("\n"),
    };

    try {
      const response = await fetch("http://localhost:3000/recipe", {
        method: "POST",
        body: JSON.stringify(newRecipe),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw "Failed to add recipe";
      } else {
        setName("");
        setCuisineType("");
        setImageLink("");
        setIngredients("");
        setInstructions("");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1>Add Recipe</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <br />
        <input
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label>Cuisine Type:</label>
        <br />
        <input
          value={cuisineType}
          required
          onChange={(e) => setCuisineType(e.target.value)}
        />
        <br />

        <label>Image Link:</label>
        <br />
        <input
          value={imageLink}
          required
          onChange={(e) => setImageLink(e.target.value)}
        />
        <br />

        <label>Ingredients:</label>
        <br />
        <textarea
          value={ingredients}
          required
          onChange={(e) => setIngredients(e.target.value)}
        ></textarea>
        <br />

        <label>Instructions:</label>
        <br />
        <textarea
          value={instructions}
          required
          onChange={(e) => setInstructions(e.target.value)}
        ></textarea>
        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
