const inquirer = require("inquirer");
const fs = require("fs").promises;

const question = [
    {
        type: "password",
        name: "password",
        massage: "What's our master password?"
    },
    {
        type: "input",
        name: "key",
        massage: "What's our name?",
    },
];




inquirer.prompt(question).then( async (answers) => {
    console.log(`Your password is ${answers.password}!`);
    console.log(`You like to know the password of ${answers.key}!`);
    
    if (answers.password === "1234") {
        console.log("Master Password is correct!");
        try {
            const passwordJSON =  await fs.readFile('./password.json', 'utf8');
            const password = JSON.parse(passwordJSON);
            console.log(`Your ${answers.key} password is ${password[answers.key]}`);
        } catch (error) {
            console.error("Somthing went wrong!");
            console.log(`You like to know the password of ${answers.key}!`);
        }
    } else {
        console.log("Master Password is incorrect!");
    };
})
