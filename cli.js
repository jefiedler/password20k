const { askQuestionStart, CHOICE_GET, askQuestionGet, CHOICE_SET, askQuestionSet } = require("./src/questions");
const { readPassword } = require("./src/password");

async function main (){
    const {masterPassword, action} = await askQuestionStart();
    if (masterPassword === "123"){
        console.log("Password is correct!");
        if (action === CHOICE_GET) {
            console.log("Now Get a password");
            const {key} = await askQuestionGet();
            try {
                const password = await readPassword(key);
                console.log(`Your ${key} password is ${password}`);
            } catch (error) {
                console.error("Somthing went wrong");
            }
        } else if (action === CHOICE_SET) {
            console.log("Now Set a password");
            const {key, password} = await askQuestionSet();
            console.log(`New Password: ${key} = ${password}`);
        }
    } else {
        console.log("Master Password is incorrect!");
    }
}
main();



