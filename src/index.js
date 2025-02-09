const axios = require('axios');
const { getRecipes, displayRecipe } = require('./recipes');
const { promptUser } = require('./utils');

// Main function to run the recipe finder
async function main() {
    try {
        const ingredient = await promptUser('Enter an ingredient: ');
        const recipes = await getRecipes(ingredient);
        if (recipes && recipes.length > 0) {
            recipes.forEach((recipe, index) => {
                console.log(`${index + 1}. ${recipe.strMeal}`);
            });
            const choice = await promptUser('Enter the number of the recipe to view details: ');
            const selectedRecipe = recipes[choice - 1];
            if (selectedRecipe) {
                await displayRecipe(selectedRecipe.idMeal);
            } else {
                console.log('Invalid choice. Please try again.');
            }
        } else {
            console.log('No recipes found for the given ingredient.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();