import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch/useFetch";

const Recipes = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/recipe");
  const recipes = data?.recipes;
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleDeleteBtn = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:3000/recipe/${recipeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw "Failed to delete Recipe";
      }

      const data = await response.json();
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>All Recipes:</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              className="col-md-3 mb-4 d-flex align-items-stretch"
              key={recipe._id}
            >
              <div className="card h-100">
                <img
                  src={recipe.recipeImage}
                  alt={recipe.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine Type: </strong>
                    {recipe.cuisineType}
                  </p>
                  <p className="card-text">
                    <strong>Ingredients: </strong>
                    <Link to={`/recipe/${recipe._id}`}>See Recipe ></Link>
                  </p>
                  <p className="card-text">
                    <strong>Instructions: </strong>
                    <Link to={`/recipe/${recipe._id}`}> See Recipe ></Link>
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteBtn(recipe._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
