const express = require("express");
const { writePassword } = require("../src/password");
const { readPassword } = require("../src/password");
const jwt = require("jsonwebtoken");

function createPasswordRouter(masterPassword, database){
    const router = express.Router();

    router.use((req, res, next) => {
        try{
            const {authToken} = req.cookies;
            const {userName} = jwt.verify(authToken, process.env.JWT_TOKEN_SECRET);
            console.log(`Allow access to ${userName}`);

        } catch (error){
            res.status(401).send("No access")
        }
    })

    router.get("/:passwordName", async (req, res) => {
        try {
            const{passwordName} = req.params;
            
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
    
    
    router.patch("/:name", async (req, res) => {
        try {
            const { name} = req.params;
            
        } catch{
            console.error("Somthing went wrong", error);
            res.status(500).send(error.massage)
        }
    })

    router.post("/", async (req, res) =>{
        try{
            const { name, value } = req.body;
            await writePassword(name, value, masterPassword, database);
            res.status(201).send("Password created")
        } catch (error) {
            console.error("Somthing went wrong", error);
        }
    });
    return router;
}

module.exports = createPasswordRouter;
