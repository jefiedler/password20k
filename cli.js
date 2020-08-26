const { askQuestionStart, CHOICE_GET, askQuestionGet, CHOICE_SET, askQuestionSet } = require("./src/questions");
const { readPassword, writePassword, readMasterPassword } = require("./src/password");

async function main (){
    const {masterPassword, action} = await askQuestionStart();
    const originalMasterPassword = await readMasterPassword();

    if (masterPassword === originalMasterPassword){
        console.log("Password is correct!");
        if (action === CHOICE_GET) {
            console.log("Now Get a password");
            const {key} = await askQuestionGet();
            try {
                const password = await readPassword(key, masterPassword);
                console.log(`Your ${key} password is ${password}`);
            } catch (error) {
                console.error("Somthing went wrong");
            }
        } else if (action === CHOICE_SET) {
            console.log("Now Set a password");
            const {key, password} = await askQuestionSet();
            await writePassword(key, password, masterPassword);
            console.log(`New Password is set`);
        }
    } else {
        console.log("Master Password is incorrect!");
    }
}
main();



