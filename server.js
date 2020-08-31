require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const { readPassword, writePassword } = require('./src/password');
const { response } = require('express');
const createReadPassword = require('./routes/createReadPasswordRoutes');
const createPostPasswordRoutes = require('./routes/createPostPasswordRoutes');
const createUserLoginRoutes = require('./routes/createUserLoginRoutes');



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

        app.use("/api/passwords", createReadPassword(masterPassword, database));

        app.use("/api/passwords", createPostPasswordRoutes(masterPassword, database));

        app.use("/api/password", createUserLoginRoutes(database));

        app.listen(port, () => {
            console.log(`Ready! App is listening on http://localhost:${port}`)
        });
    //} finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    //}
}

server();