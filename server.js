require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const createReadPassword = require('./routes/createReadPasswordRoutes');
const createPostPasswordRoutes = require('./routes/createPostPasswordRoutes');
const createUserLoginRoutes = require('./routes/createUserLoginRoutes');
const cookieParser = require("cookie-parser");
const createPasswordRouter = require('./routes/createPasswordRouter');



const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`Request ${req.method} on ${req.url}`)
    next();
})


async function server(){
    try {
        await client.connect();
        const database = client.db(process.env.MONGO_DB_NAME);
        const masterPassword = process.env.MASTER_PASSWORD;

        app.use("/api/passwords", createPasswordRouter(masterPassword, database))

        app.use("/api/password", createUserLoginRoutes(database));

        app.listen(port, () => {
            console.log(`Ready! App is listening on http://localhost:${port}`)
        });
    } catch (error) {
        //Ensures that the client will close when you finish/error
        await client.close();
        console.error(error);
    }
}

server();