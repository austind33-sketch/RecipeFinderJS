const axios = require('axios');

// Function to get recipes based on multiple ingredients
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
async function displayRecipe(recipeId) {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const recipe = response.data.meals[0];
        console.log(`Title: ${recipe.strMeal}`);
        console.log(`Category: ${recipe.strCategory}`);
        console.log(`Area: ${recipe.strArea}`);
        console.log(`Instructions: ${recipe.strInstructions}`);
        
        // Display all ingredients
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