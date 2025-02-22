const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection URL - Replace with your MongoDB server's URL
//const url = 'mongodb://localhost:27017';
const url = `mongodb://mongodb:27017`;

const client = new MongoClient(url);
const dbName = 'testDB'; // Name of your database
let db;

// Connect to MongoDB and get the database instance
client.connect()
  .then(() => {
    db = client.db(dbName);
    console.log("Connected successfully to MongoDB");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

// Test route
app.get('/test', (req, res) => {
  return res.status(200).json({ message: "server test is ok" });
});

// Route to get user list
app.get('/users', async (req, res) => {
  try {
    const users = await db.collection('users').find().toArray();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route to add a new user
app.post('/add-user', async (req, res) => {
  const { username } = req.body;
  if (username) {
    try {
      await db.collection('users').insertOne({ username });
      res.json({ message: 'User added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving user' });
    }
  } else {
    res.status(400).json({ message: 'Invalid username' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
