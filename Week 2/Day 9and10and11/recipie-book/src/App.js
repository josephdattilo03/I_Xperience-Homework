import { useEffect, useState } from 'react'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeForm from "./components/recipebook/RecipeForm"
import Recipe from "./models/recipe"
import RecipeService from "./services/recipe-service"
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { auth } from "./firebase/firebase"
import Navbar from './components/common/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import RequireAuth from './components/recipebook/RequireAuth';
import Spinner from './components/common/Spinner';

function App() {
  const [recipes, setRecipes] = useState([])
  const [user, setUser] = useState(null);
  const [isUserUpdated, setIsUserUpdated] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsUserUpdated(true)
    });
  }, []);

  useEffect(() => {
    if (!recipes.length) {
      onInitialLoad()
    }
  }, [])

  async function onInitialLoad() {
    try {
      const recipes = await RecipeService.fetchRecipes()
      setRecipes(recipes)
    } catch (err) {
      console.log(err)
    }
  }

  async function onRecipeCreate(name, ingredients, instructions) {
    if (name === "" || ingredients.includes("") || instructions === "") {
      alert("Fill in all values")
      return
    }
    const recipe = await RecipeService.createRecipe(new Recipe(name, ingredients, instructions))
    setRecipes([...recipes, recipe])
  }

  async function onRecipeRemove(recipeId) {
    await RecipeService.deleteRecipe(recipeId)
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeId))
  }


  return (
    <BrowserRouter>
      <Navbar user={user} />
      {
        isUserUpdated ?

          <Routes>
            <Route path="/" element={<RequireAuth user={user}><RecipeForm onRecipeRemove={onRecipeRemove} recipes={recipes} onRecipeCreate={onRecipeCreate} /></RequireAuth>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes> :
          <div className='m-5 text-center'><Spinner/></div> 
          
      }
    </BrowserRouter>
  );
}

export default App;
