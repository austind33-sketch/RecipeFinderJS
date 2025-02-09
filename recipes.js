const axios = require('axios');

// Function to get recipes based on ingredients
async function getRecipes(ingredients) {
    const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=YOUR_API_KEY`);
    return response.data;
}

// Function to display recipe details
function displayRecipe(recipe) {
    console.log(`Title: ${recipe.title}`);
    console.log(`Ingredients: ${recipe.ingredients.join(', ')}`);
    console.log(`Instructions: ${recipe.instructions}`);
}

module.exports = { getRecipes, displayRecipe };