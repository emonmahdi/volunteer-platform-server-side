const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


// middle
app.use(express.json());
app.use(cors());


app.get('/',(req, res) => {
    res.send('Volunteer Platform Node server.')
});




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pctoobb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const eventsCollection = client.db('volunteerDB').collection('events');
        const volunteerCollection = client.db('volunteerDB').collection('volunteers')
        const ordersCollection = client.db('volunteerDB').collection('orders')
        // GET API
        app.get('/events', async(req, res) => {
            const query = {}
            const cursor = eventsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get('/events/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await eventsCollection.findOne(query)
            res.send(result)
        })

        // POST API
        app.post('/event', async(req, res) => {
            const event = req.body;
            console.log(event)
            const result = await eventsCollection.insertOne(event);
            res.send(result)
        });

        // Register POST API
        app.post('/volunteer', async(req, res) => {
            const query = req.body;
            const result = await volunteerCollection.insertOne(query);
            res.send(result)
        });
        // GET API Volunteer
        app.get('/volunteer', async(req, res) => {
            const query = {};
            const cursor = volunteerCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        });
        // DELETE API Volunteer List
        app.delete('/volunteer/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await volunteerCollection.deleteOne(query);
            res.send(result);
        });
        // ORDER POST API
        app.post('/order', async(req, res) => {
            const query = req.body;
            const result = await ordersCollection.insertOne(query);
            res.send(result)
        });
        //ORDER GET API
        app.get('/order', async(req, res) => {
            const query = {};
            const cursor = ordersCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

    }
    finally{
        // await client.close();
    }

}
run().catch(console.dir)



app.listen(port, () => {
    console.log('My server is Running.......');
})