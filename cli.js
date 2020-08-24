// Password input in console with board moduls

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })
  
//   readline.question(`What's your password?`, password => {
//     console.log(`Your password is ${password}!`)
//     readline.close()
//   })



const inquirer = require("inquirer");

const question = [
    {
        type: "input",
        name: "name",
        massage: "What's our name?",
    },
    {
        type: "password",
        name: "password",
        massage: "What's our password?"
    },
];

inquirer.prompt(question).then((answers) => {
    console.log(`Your name is ${answers.name}!`);
    console.log(`Your password is ${answers.password}!`);
})