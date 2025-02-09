// This module contains utility functions that can be used in other modules.
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser(query) {
    return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

module.exports = { promptUser };