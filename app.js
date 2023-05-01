const express = require('express');
const mongoose = require('mongoose');
const app = express();

const main = async () => {
  try {
    // Connect to MongoDB
    const mongoConnect = await mongoose.connect('mongodb://localhost:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected...');

    // Define a schema for the practice collection
    const practiceSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      }
    });

    // Define a model for the practice collection
    const Practice = mongoose.model('Practice', practiceSchema);

    // Create a new instance of the model and save it to the collection
    const practice = new Practice({
      name: 'Usman',
      age: 30
    });
    await practice.save();
    console.log('Data saved to practice collection...');

  } catch (error) {
    console.log('Error:', error);
  }
};

main();

// Middleware function to handle home page
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
