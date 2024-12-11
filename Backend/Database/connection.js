import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.mongoUrl;
const connection = () => {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to DataBase");
    })
    .catch((err) => {
      console.log("error occured while connecting to DataBase", err);
    });
};

export default connection;
