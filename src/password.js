const { encrypt, decrypt } = require("./crypto");
const fs = require("fs").promises;

async function readPasswords(){
    const passwordJson = await fs.readFile("./password.json", "utf-8");
    const passwords = JSON.parse(passwordJson);
    return passwords;
}


async function readPassword(key, masterPassword, database) {
    const collection = database.collection("password20k");
    const encryptPassword = await collection.findOne({ name: key });
    const password = decrypt(encryptPassword.value, masterPassword);
    return password;
}

async function writePassword(key, value, masterPassword, database) {
    const collection = database.collection("password20k");
    const encryptPassword = encrypt(value, masterPassword);
    await collection.insertOne({
        name: key,
        value: encryptPassword,
    })
}

async function readMasterPassword(){
    try {
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
    } catch (error) {
        return null;
    }
}

async function writeMasterPassword(masterPassword) {
    await fs.writeFile("./masterPassword", masterPassword);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.readMasterPassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;