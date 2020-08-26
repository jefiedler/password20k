const inquirer = require("inquirer");

const CHOICE_GET = "Read a password";
const CHOICE_SET = "Set a password";

const startQuestions = [
    {
        type: "password",
        name: "masterPassword",
        message: "What's our master password?"
    },
    {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [CHOICE_GET, CHOICE_SET],
    },
];

const questionsGet = [
    {
        type : "input",
        name: "key",
        message: "Which password do you need?"
    },
];

const questionsSet = [
    {   
        type: "input",
        name: "key",
        message: "Which password do you like to set?",
    },
    {
        type: "password",
        name: "password",
        message: "Please enter the password",
    },
];

const questionsNewMasterPassword = [
    {
        type: "password",
        name: "newMasterPassword",
        message: "Pleas enter your new master password",
    },
];

function askQuestionStart () {
    return inquirer.prompt(startQuestions);
}

function askQuestionGet () {
    return inquirer.prompt(questionsGet);
}

function askQuestionSet () {
    return inquirer.prompt(questionsSet);
}

function askForMasterPassword() {
    return inquirer.prompt(questionsNewMasterPassword);
}

exports.askQuestionStart = askQuestionStart;
exports.askQuestionGet = askQuestionGet;
exports.askQuestionSet = askQuestionSet;
exports.askForMasterPassword = askForMasterPassword;
exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;