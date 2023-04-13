const express = require('express')
const mongoose = require('mongoose');
const { Schema } = mongoose;

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

// Make token
const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, '1046838936142178202908247229722173761275457', { expiresIn: '1h' });
  return token;
}


//Schemas for database
const quoteSchema = new Schema({
    quoteID: { type: String },
    userID: { type: String, required: true },
    title: { type: String },
    description: { type: String, required: true },
    numOfWorkers: { type: Number, required: true },
    workerRate: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    fudgeFactor: { type: Number, required: false },
    totalCost: { type: Number, required: true },
  });


  const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userID: { type: String, required: true, unique: true } // add unique option here
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
    username: req.body.username,
    password: req.body.password,
    userID: uuidv4() // generate a unique ID for the user

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

app.post('/quotes', async (req, res) => {
  console.log("Quote")
  try {
    // Get the user ID from the JWT token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }
    console.log("Quote2")
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, '1046838936142178202908247229722173761275457');
    const userID = decoded.id;

      // Find the user object using the userID
    const user = await User.findById(userID);
    console.log(userID)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      title,
      description,
      numOfWorkers,
      workerRate,
      startDate,
      endDate,
      fudgeFactor,
      totalCost,
    } = req.body;

    // Create a new quote object
    const newQuote = new Quote({
      quoteID: uuidv4(),
      userID, 
      title,
      description,
      numOfWorkers,
      workerRate,
      startDate,
      endDate,
      fudgeFactor,
      totalCost,
    });

      // Save the new quote object to the database
      await newQuote.save();

      res.status(201).json({ message: 'Quote created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5000, () => {console.log("Server started on port 5000")})
