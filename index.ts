import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from "mongodb";


const PORT = process.env.PORT || 5000
const app = express();
dotenv.config();


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.uh9rxet.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


//middleware
app.use(cors());
app.use(express.json())



app.get("/", (req, res) => {
    res.send("Hello0000");
})

async function run() {
    try {
        const tasksCollection = client.db('pro-tasker').collection('tasks');

        app.post("/task", async (req, res) => {
            const task = req.body;
            const result = await tasksCollection.insertOne(task);
            res.send(result)
        })

        app.get("/task", async (req, res) => {
            const query = {};
            const result = await tasksCollection.find(query).toArray();
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));

app.listen(PORT, () => {
    console.log("listening to port ", PORT)
})