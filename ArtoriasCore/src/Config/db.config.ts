import Mongoose = require('mongoose');
const env = require('dotenv').config()

let database: Mongoose.Connection;

export const connect = () => {

    let url = env.MONGODB_URL;
    console.log("from connect: process.env.MONGODB_URL :::",process.env.MONGODB_URL)

    if (database) {
        return;
    }
    
    const options = {
      useNewUrlParser: "true",
      useFindAndModify: "false",
      useUnifiedTopology: "true",
      useCreateIndex: "true",
      maxPoolSize: 100,
      reconnectTries: Number.MAX_VALUE
  }

    Mongoose.connect(url, options);
    
    database = Mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });
      
    database.on("error", () => {
        console.log("Error connecting to database");
    });

};

export const disconnect = () => {
    
    if (!database) {
      return;
    }
    
    Mongoose.disconnect();

    database.once("close", async () => {
        console.log("Disconnected from database");
    });

};