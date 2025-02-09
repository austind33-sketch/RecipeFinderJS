const axios = require('axios');

// Function to get recipes based on multiple ingredients
// Conatins an async function that takes an array of ingredients as an argument
// The function uses the axios library to make a GET request to the MealDB API
// The API endpoint is constructed using the ingredientList, which is a comma-separated list of ingredients
async function getRecipes(ingredients) {
    const ingredientList = ingredients.join(',');
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientList}`);
        return response.data.meals;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return null;
    }
}

// Function to display recipe details
// Contains an async function that takes a recipeId as an argument
// The function uses the axios library to make a GET request to the MealDB API
// The API endpoint is constructed using the recipeId to fetch details of a specific recipe
async function displayRecipe(recipeId) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const recipe = response.data.meals[0];
        console.log(`Title: ${recipe.strMeal}`);
        console.log(`Category: ${recipe.strCategory}`);
        console.log(`Area: ${recipe.strArea}`);
        console.log(`Instructions: ${recipe.strInstructions}`);
        
        // Display all ingredients
        // Ingredients are stored in the recipe object as strIngredient1, strIngredient2, etc.
        // Loop through the recipe object to find all ingredients and display them
        // Ingredients are stored as an array of strings
        // Join the array of ingredients with a comma and space to display them in a single line
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            if (ingredient) ingredients.push(ingredient);
        }
        console.log(`Ingredients: ${ingredients.join(', ')}`);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

module.exports = { getRecipes, displayRecipe };