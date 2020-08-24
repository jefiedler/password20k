const { async } = require("rxjs");

const fs = require("fs").promises;

async function readPassword(key) {
    const passwordJson = await fs.readFile("./password.json", "utf-8");
    const passwords = JSON.parse(passwordJson);
    const password = passwords[key];
    return password;
}

exports.readPassword = readPassword;