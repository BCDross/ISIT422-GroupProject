import dotenv = require('dotenv');
import mongoose = require('mongoose');

dotenv.config();
let database: mongoose.Connection;

export const connect = () => {

    const url: string = (process.env.MONGODB_URL as string);

    if (database) {
        return;
    }
    
    const options = {
        maxPoolSize: 100,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: true,
        //useCreateIndex: true,
        //reconnectTries: Number.MAX_VALUE
    }

    mongoose.connect(url, options);
    
    database = mongoose.connection;

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
    
    mongoose.disconnect();

    database.once("close", async () => {
        console.log("Disconnected from database");
    });

};