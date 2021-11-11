require('dotenv').config();
import mongoose = require('mongoose');

let database: mongoose.Connection;

export const connect = () => {

    const url: string = (process.env.MONGODB_URL as string);
    console.log(typeof(url));
    console.log("from connect: process.env.MONGODB_URL :::",url);

    if (database) {
        return;
    }
    
    const options = {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      maxPoolSize: 100,
      reconnectTries: Number.MAX_VALUE
    }

    mongoose.connect('mongodb+srv://422cdd:422cdd@realmcluster.tcjhw.mongodb.net/ArtoriasDB?retryWrites=true&w=majority', options);
    
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