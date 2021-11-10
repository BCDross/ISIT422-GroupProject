const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
import userRouter from "./Routes/userRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);

app.use("/api/users", userRouter);

const port = process.env.PORT;
app.listen(port, (): void => {
  console.log(`Connected successfully on port ${port}`);
  });