const mongoose = require('mongoose');
require('dotenv').config()
const id = process.env.MONGO_ID;
const password = process.env.MONGO_PASSWORD;
const url = `mongodb+srv://${id}:${password}@cluster0.uut9cx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToMongo = async ()=>{
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error("Error : ", error.message);
  }
}

module.exports = connectToMongo;