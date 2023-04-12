const express = require('express')
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { MongoClient } = require('mongodb');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const uri = 'mongodb+srv://patrickjohnmurchie:Btg8rvAJXbrAi1yc@cluster0.qmh8sr5.mongodb.net/test?retryWrites=true&w=majority';

const app = express()

app.use(express.json());

// Allow all origins to make requests to this app
app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:3000' // allow requests only from this origin
    })
);


//Schemas for database
const quoteSchema = new Schema({
    quoteID: { type: String, unique: true },
    userID: { type: String, required: true },
    title: { type: String },
    description: { type: String, required: true },
    numOfWorkers: { type: Number, required: true },
    workerRate: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    fudgeFactor: { type: Number, required: true },
    totalCost: { type: Number, required: true },
  });

  const userSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  


  const Quote = mongoose.model('Quote', quoteSchema);
  const User = mongoose.model('User', userSchema);
  
  module.exports = { Quote, User };

//Connecting to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });


// Endpoints
app.post('/register', (req, res) => {
  const newUser = new User({
    userID: uuidv4(),
    username: req.body.username,
    password: req.body.password
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Login

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token and send it in the response
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/quotes', (req, res) => {
    Quote.find()
      .then(quotes => res.json(quotes))
      .catch(err => res.status(400).json('Error: ' + err));
  });

app.listen(5000, () => {console.log("Server started on port 5000")})