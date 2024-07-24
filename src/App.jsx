import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Header from "./components/Header";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="addRecipes" element={<AddRecipe />} />
          <Route path="recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
