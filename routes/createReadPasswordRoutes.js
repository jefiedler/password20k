const express = require("express");
const { readPassword } = require("../src/password");
const jwt = require("jsonwebtoken");

function createReadPassword(masterPassword, database){
    const router = express.Router();

    router.get("/:passwordName", async (req, res) => {
        try {
            const{passwordName} = req.params;
            
            const {authToken} = req.cookies;
            const {userName} = jwt.verify(authToken, process.env.JWT_TOKEN_SECRET);
            console.log(`Allow access to ${userName}`);
            
            const password = await readPassword(passwordName, masterPassword, database);
            if (!password) {
                res.status(404).send(`Password ${passwordName} not found`);
                return;
            }
            res.status(200).send(`Password is find! The password for ${passwordName} is ${password}`);
        } catch (error){
            console.error("Somthing went wrong", error);
            res.status(500).send(error.massage)
         }
    });
    return router;
}


module.exports = createReadPassword;