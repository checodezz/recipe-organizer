import { useParams } from "react-router-dom";
import useFetch from "../useFetch/useFetch";

const RecipeDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/recipe/${id}`
  );
  const recipe = data?.recipe;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mt-3 pb-5">
      <h1>{recipe.name}</h1>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={recipe.recipeImage}
              className="img-fluid rounded-start w-100 h-100"
              alt={recipe.name}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-text">Cuisine: {recipe.cuisineType}</h2>
              <p className="card-text">
                <strong>Ingredients:</strong>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </p>
              <p className="card-text">
                <strong>Instructions:</strong>
                <ol>
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
