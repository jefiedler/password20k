const { askQuestionStart, CHOICE_GET, askQuestionGet, CHOICE_SET, askQuestionSet, askForMasterPassword } = require("./src/questions");
const { readPassword, writePassword, readMasterPassword, writeMasterPassword } = require("./src/password");
const { createHash, verifyHash } = require("./src/crypto");

async function main (){
    const originalMasterPassword = await readMasterPassword();
    if (!originalMasterPassword){
        const {newMasterPassword} = await askForMasterPassword();
        const hashMasterPassword = await createHash(newMasterPassword);
        await writeMasterPassword(hashMasterPassword);
        console.log("Master Password set!");
        return;
    }

    const {masterPassword, action} = await askQuestionStart();

    if (await !verifyHash(masterPassword, originalMasterPassword)) {
        console.log("Master Password is incorrect!");
        return;
    }
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
}
main();



