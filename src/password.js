const { encrypt, decrypt } = require("./crypto");
const fs = require("fs").promises;

async function readPasswords(){
    const passwordJson = await fs.readFile("./password.json", "utf-8");
    const passwords = JSON.parse(passwordJson);
    return passwords;
}

async function writePasswords(passwords){
    const newPasswordJson = JSON.stringify(passwords, null, 2);
    await fs.writeFile("./password.json", newPasswordJson);
}

async function readPassword(key, masterPassword) {
    const passwords = await readPasswords();
    const password = decrypt(passwords[key], masterPassword);
    return password;
}

async function writePassword(key, value, masterPassword) {
    const password = await readPasswords();
    password[key] = encrypt(value, masterPassword);
    await writePasswords(password);
}

async function readMasterPassword(){
    const masterPassword = await fs.readFile("./masterPassword", "utf-8");
    return masterPassword;
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;
exports.readMasterPassword = readMasterPassword;