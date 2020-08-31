require('dotenv').config();
const express = require("express");
const jwt = require ("jsonwebtoken");

function createUserLoginRoutes(database){
    const router = express.Router();

    const userCollection = database.collection("useraccounts");
    
    router.post("/login", async (req, res) => {
        try {
            const {userName, password} =req.body;
            const user = await userCollection.findOne({userName, password});
            if (!user){
                res.status(401).send(`You are unauthorized`);
                return;
            }
            const token = jwt.sign({userName}, process.env.JWT_TOKEN_SECRET, {expiresIn: "360s"});
            res.setHeader("Set-Cookie", `authToken=${token};path=/;Max-Age=360`);
            res.status(202).send("User has login");
        } catch {
            console.error("Somthing went wrong", error);
            res.status(500).send(error.massage)
        }
    });
    return router;
}

module.exports = createUserLoginRoutes;