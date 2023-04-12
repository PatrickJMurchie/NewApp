const express = require('express')
const mongoose = require('mongoose');
const { Schema } = mongoose;


const app = express()


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
    userID: {type: String,required: true, unique: true},
    username: {type: String,required: true,unique: true},
    password: {type: String,required: true}
  });

  module.exports = {
    Quote: mongoose.model('Quote', quoteSchema),
    User: mongoose.model('User', userSchema)
  };

//Connecting to database
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

app.post('/api/users', (req, res) => {
  const newUser = new User({
    userID: req.body.userID,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/quotes', (req, res) => {
    Quote.find()
      .then(quotes => res.json(quotes))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

app.listen(5000, () => {console.log("Server started on port 5000")})