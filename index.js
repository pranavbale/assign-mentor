import express, { response } from "express";
import { connect } from "mongoose";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());


const PORT = process.env.PORT  || 4000;
app.get("/", function (request, response) {
  response.send("Hello Word !!!");
});


const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect()
console.log("mongoDB is connected");


// gatting the room database
app.get('/mentor', async (request, response) => {
    const room = await client.db('assign-mentor').collection('mentor').find({}).toArray();
    response.send(room);
})

// posting the room database
app.post('/mentor', async (request, response) => {
    const data = request.body;
    console.log(data);
    const result = await client.db('assign-mentor').collection('mentor').insertMany(data);
    response.send(result);
})

// gatting the room booking data;
app.get('/student', async (request, response) => {
    const roomBook = await client.db('assign-mentor').collection('student').find({}).toArray();
    response.send(roomBook);
})

// posting the room database
app.post('/student', async (request, response) => {
    const data = request.body;
    console.log(data);
    const bookedRoom = await client.db('assign-mentor').collection('student').insertMany(data);
    response.send(bookedRoom);
})


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
