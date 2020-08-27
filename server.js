require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { readPassword, writePassword } = require('./src/password');

const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
const app = express();
const port = 3000;
app.use(bodyParser.json());


async function server(){
    //try {
        await client.connect();
        const database = client.db(process.env.MONGO_DB_NAME);
        const masterPassword = process.env.MASTER_PASSWORD;
    
        app.get("/api/passwords/:key", async (request, respons ) => {
            try {
                const{key} = request.params;
                const password = await readPassword(key, masterPassword, database);
                console.log(`Your ${key} password is ${password}`);
                respons.status(200).send("Password is find");
            } catch (error){
                console.error("Somthing went wrong", error);
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