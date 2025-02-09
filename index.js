const axios = require('axios');
const { getrecipies, displayrecipies } = require('./recipies');
const { promptUser } = require('./utils');

// Main function to run the reicpie finder
async function main() {
    try {
        const ingredients = await promptUser('Enter the ingredients you have separated by commas: ');
        const recipies = await getrecipies(ingredients);
        recipies.forEach((recipie, index) => {
            console.log(`${index + 1}. ${recipie.title}`);
        });
        const choice = await promptUser('Enter the number of the recipie you want to see: ');
        displayrecipies(recipies[choice - 1]);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();