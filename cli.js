const { askQuestionStart, CHOICE_GET, askQuestionGet, CHOICE_SET, askQuestionSet, askForMasterPassword } = require("./src/questions");
const { readPassword, writePassword, readMasterPassword, writeMasterPassword } = require("./src/password");
const { createHash, verifyHash } = require("./src/crypto");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://jefiedler:clep9nair!gaff5RACK@cluster0.jobwz.mongodb.net?retryWrites=true&w=majority";

const client = new MongoClient(uri);


async function main (){
    try{
        await client.connect();
        const database = client.db("password20k");

        const originalMasterPassword = await readMasterPassword();
        if (!originalMasterPassword){
            const {newMasterPassword} = await askForMasterPassword();
            const hashMasterPassword = await createHash(newMasterPassword);
            await writeMasterPassword(hashMasterPassword);
            console.log("Master Password set!");
            return;
        }

        const {masterPassword, action} = await askQuestionStart();

        if (!verifyHash(masterPassword, originalMasterPassword)) {
            console.log("Master Password is incorrect!");
            return;
        }
        console.log("Password is correct!");
            if (action === CHOICE_GET) {
                console.log("Now Get a password");
                const {key} = await askQuestionGet();
                try {
                    const password = await readPassword(key, masterPassword, database);
                    console.log(`Your ${key} password is ${password}`);
                } catch (error) {
                    console.error("Somthing went wrong");
                }
            } else if (action === CHOICE_SET) {
                console.log("Now Set a password");
                const {key, password} = await askQuestionSet();
                await writePassword(key, password, masterPassword, database);
                console.log(`New Password is set`);
            }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
main();



