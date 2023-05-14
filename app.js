const { log } = require('console');
const express = require('express');
const validator = require('validator');
const mongoose = require('mongoose');
const app = express();

const main = async () => {
  try {
    // Connect to MongoDB   default path-> //mongodb:localhost:27017
    const mongoConnect = await mongoose.connect('mongodb://0.0.0.0:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected sucessfully...');

    // Define a schema for the practice collection
    const practiceSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        lowercase: true,  //validation
        trim: true,
       // uppercase: true,
        minlength: 2,
        maxlength: 20,
        
      },
      class: {
          type: String,
          enum: ["Msc" , "MA", "Mcom"], //yani class ki value bs in me se 1 hogi
          require: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new Error('Email is inValid');
         } 
        }
      },
      age: {
        type: Number,
        required: true,
        //custom validation
        validate(value){
          if(value < 0){
            throw new Error("age should be greater than 0")
          }
        }
      }
    });

    // Define a model for the practice collection
    const Practice = mongoose.model('Practice', practiceSchema);


    // read operation or read documents
    const getdocuments = async () => {
      // const result = await Practice.find();
      // fillter data and select only first field and show // limit yani 10 is age k hote to 1 show krta
      const result = await Practice
       // .find({ age: 34 })
      //comparision operator use($gt,$gte,$lt,$lte,$in)
    //  .find({ age: {$gt : 30} }) // ye sirf usy sow kry ga jinki age > 30 hai
     // .find({ age: {$in : [30] }}) // $in mean match the value, ye array me value lyta ha
      //logical operator ($or, $and, $nor, $not)  
      .find({ $or: [{age : 30} , {name : "Sania"}] }) // take array 
      .select({ age: 1 })
      .sort({name : -1})        //1 is asscending -1 decensending
     // .countDocuments(); // how many documents are there
     //   .limit(1); 
      console.log(result);
    }
   // getdocuments();
    const updateDocument = async (id) => {
      try {
        const result = await Practice.findByIdAndUpdate({_id : id} , { 
          $set : 
          {name : "Hussain gee"} 
        },
        {
          new: true   // jo new value updat ki hai usy show kry.
        })
        console.log("document updated sucessfully...")
        console.log(result);
      } 
      catch (error) {
        console.log(error);
      }   
     
    }
//    updateDocument("644fd5e74a7011c25ef4dbed");

   // delete documents
    const deleteDocument = async (_id) => {
      try {                          //findByIdAndDelete ye many k liye
        const result = await Practice.deleteOne({ _id }); // { _id : _id } 
        console.log(result) 
      } 
      catch (error) {
        console.log(error);
      }  
    }

   // deleteDocument("645297379bccaefff49770d8");

    // Create a new instance of the model and save it to the collection and insert documents
    const practice1 = new Practice({
      name: 'Saeed',
      age: 30
    });

    const practice2 = new Practice({
      name: 'Shafiq',
      age: 34
    });

    const practice3 = new Practice({
      name: 'Sapna',
      age: 36
    });

    const practice4 = new Practice({
      name: 'upparcase',
      age: 12,
      class: "Msc",
      email: "abcd@gmail.com"
    });
    // inserting documents in collection one or many
    // await practice.save();
    //   await Practice.insertMany([practice1,practice2,practice3,practice4]);
   const result = await Practice.insertMany([practice4]);
    console.log(result);  
   console.log('Data saved in practice collection...');

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
