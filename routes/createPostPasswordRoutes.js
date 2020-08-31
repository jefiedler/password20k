const express = require("express");
const { writePassword } = require("../src/password");


function createPostPasswordRoutes(masterPassword, database){
    const router = express.Router();

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

module.exports = createPostPasswordRoutes;