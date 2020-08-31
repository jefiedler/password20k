require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { readPassword, writePassword } = require('./src/password');
const { response } = require('express');

const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use((res, req, next) => {
    console.log(`Request ${req.methode} on ${req.url}`)
    next();
})


async function server(){
    //try {
        await client.connect();
        const database = client.db(process.env.MONGO_DB_NAME);
        const masterPassword = process.env.MASTER_PASSWORD;
    
        app.get("/api/passwords/:passwordName", async (request, respons ) => {
            try {
                const{passwordName} = request.params;
                const password = await readPassword(passwordName, masterPassword, database);
                if (!password) {
                    response.status(404).send(`Password ${passwordName} not found`);
                    return;
                }
                //console.log(`Your ${passwordName} password is ${password}`);
                respons.status(200).send(`Password is find! The password for ${passwordName} is ${password}`);
            } catch (error){
                console.error("Somthing went wrong", error);
                response.status(500).send(error.massage)
             }
        });
        app.post("/api/passwords", async (req, res) => {
            try{
                const { name, value } = req.body;
                await writePassword(name, value, masterPassword, database);
                res.status(201).send("Password created")
            } catch (error) {
                console.error("Somthing went wrong", error);
            }
        })
        app.listen(port, () => {
            console.log(`Ready! App is listening on http://localhost:${port}`)
        });
    //} finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    //}
}

server();