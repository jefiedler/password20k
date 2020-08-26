const { async } = require("rxjs");
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

async function readPassword(key) {
    const passwords = await readPasswords();
    const password = passwords[key];
    return password;
}

async function writePassword(key, value) {
    const password = await readPasswords();
    password[key] = value;
    await writePasswords(password);
}

exports.readPassword = readPassword;
exports.writePassword = writePassword;