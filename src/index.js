const axios = require('axios');
const { getRecipes, displayRecipe } = require('./recipes');
const { promptUser } = require('./utils');

// Main function to run the recipe finder
async function main() {
    try {
        let continueSearch = true;
        while (continueSearch) {
            const ingredientInput = await promptUser('Enter ingredients separated by commas (ei. eggs,milk) or type "exit" to quit: ');
            if (ingredientInput.toLowerCase() === 'exit') {
                console.log('Exiting the recipe finder. Goodbye!');
                continueSearch = false;
                break;
            }
            const ingredients = ingredientInput.split(',').map(ingredient => ingredient.trim());
            const recipes = await getRecipes(ingredients);
            if (recipes && recipes.length > 0) {
                recipes.forEach((recipe, index) => {
                    console.log(`${index + 1}. ${recipe.strMeal}`);
                });
                const choice = await promptUser('Enter the number of the recipe to view details or type "exit" to quit: ');
                if (choice.toLowerCase() === 'exit') {
                    console.log('Exiting the recipe finder. Goodbye!');
                    continueSearch = false;
                    break;
                }
                const selectedRecipe = recipes[parseInt(choice) - 1];
                if (selectedRecipe) {
                    await displayRecipe(selectedRecipe.idMeal);
                } else {
                    console.log('Invalid choice. Please try again.');
                }
            } else {
                console.log('No recipes found for the given ingredients.');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();