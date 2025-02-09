const axios = require('axios');
const { getRecipes, displayRecipe } = require('./recipes');
const { promptUser } = require('./utils');

// Main function to run the recipe finder
// Contains an async function that prompts the user for ingredients
async function main() {
    try {
        let continueSearch = true;
        while (continueSearch) {
            const ingredientInput = await promptUser('Enter ingredients separated by commas (ei. egg, milk) or type "exit" to quit: ');
            if (ingredientInput.toLowerCase() === 'exit') {
                console.log('Exiting the recipe finder. Goodbye!');
                continueSearch = false;
                break;
            }
            // Split the input string by commas and trim whitespace
            const ingredients = ingredientInput.split(',').map(ingredient => ingredient.trim());
            const recipes = await getRecipes(ingredients);
            if (recipes && recipes.length > 0) {
                recipes.forEach((recipe, index) => {
                    console.log(`${index + 1}. ${recipe.strMeal}`);
                });
                // Prompt user to select a recipe or exit
                const choice = await promptUser('Enter the number of the recipe to view details or type "exit" to quit: ');
                if (choice.toLowerCase() === 'exit') {
                    console.log('Exiting the recipe finder. Goodbye!');
                    continueSearch = false;
                    break;
                }
                // Display the selected recipe
                const selectedRecipe = recipes[parseInt(choice) - 1];
                if (selectedRecipe) {
                    await displayRecipe(selectedRecipe.idMeal);
                } 
                // If the user enters an invalid choice
                else {
                    console.log('Invalid choice. Please try again.');
                }
            // If no recipes are found for the given ingredients
            } else {
                console.log('No recipes found for the given ingredients.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();