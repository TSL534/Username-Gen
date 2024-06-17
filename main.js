const fs = require('fs');
const readline = require('readline');

// randome names stolen on googel :D
const adjectives = [
    "Fast", "Sly", "Clever", "Brave", "Bright", "Quick", "Sharp", "Swift", "Calm", "Bold",
    "Mighty", "Fierce", "Gentle", "Wise", "Loyal", "Fearless", "Epic", "Grand", "Silent", "Noble"
];
const nouns = [
    "Tiger", "Lion", "Eagle", "Shark", "Panther", "Wolf", "Hawk", "Falcon", "Bear", "Dragon",
    "Phoenix", "Griffin", "Leopard", "Cougar", "Raven", "Owl", "Viper", "Fox", "Cheetah", "Jaguar"
];


function generateUsername() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000); 
    return `${randomAdjective}${randomNoun}${randomNumber}`;
}


function generateUsernames(count) {
    const usernames = [];
    for (let i = 0; i < count; i++) {
        usernames.push(generateUsername());
    }
    return usernames;
}


function promptUsernameCount() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("How many Usernames you want to generate ?", (answer) => {
        const count = parseInt(answer, 10);
        if (isNaN(count) || count <= 0) {
            console.log("Pls put a vaild nummber! ");
            rl.close();
            return;
        }
        const usernames = generateUsernames(count);
        const jsonUsernames = JSON.stringify(usernames, null, 2);

        
        fs.writeFile('usernames.json', jsonUsernames, (err) => {
            if (err) {
                console.error('error while wring usernames in the file:', err);
            } else {
                console.log('Pluh it worked !');
            }
            rl.close();
        });
    });
}

// Aufruf der Funktion zur Generierung der Benutzernamen
promptUsernameCount();
