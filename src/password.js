const { encrypt, decrypt } = require("./crypto");
const fs = require("fs").promises;

async function readPassword(key, masterPassword, database) {
    const collection = database.collection("password20k");
    const encryptPassword = await collection.findOne({ name: key });
    const password = decrypt(encryptPassword.value, masterPassword);
    if (!password) {
        return null;
    }
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

async function patchPasswords(name, value, database,){
    const passwordCollection = database.collection("password20k");
    await passwordCollection.updateOne(
        {name: name},
        {
            $set: {
              name: name,
              value: value,
            },
          }
    );
}

async function deletePasswords(name, database){
    const passwordCollection = database.collection("password20k");
    await collection.deleteOne({name: name});
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.readMasterPassword = readMasterPassword;
exports.writeMasterPassword = writeMasterPassword;
exports.patchPasswords = patchPasswords;
exports.deletePasswords = deletePasswords;