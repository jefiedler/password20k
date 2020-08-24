const inquirer = require("inquirer");

const CHOICE_GET = "Read a password";
const CHOICE_SET = "Set a password";

const startQuestions = [
    {
        type: "password",
        name: "password",
        message: "What's our master password?"
    },
    {
        type: "input",
        name: "key",
        message: "What's our name?",
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

function askQuestionStart () {
    return inquirer.prompt(startQuestions);
}

function askQuestionGet () {
    return inquirer.prompt(questionsGet);
}

function askQuestionSet () {
    return inquirer.prompt(questionsSet);
}

exports.askQuestionStart = askQuestionStart;
exports.askQuestionGet = askQuestionGet;
exports.askQuestionSet = askQuestionSet;
exports.CHOICE_GET = CHOICE_GET;
exports.CHOICE_SET = CHOICE_SET;