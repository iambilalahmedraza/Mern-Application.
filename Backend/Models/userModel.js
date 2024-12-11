import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  OTP: Number,
});

const Users = mongoose.model("UserVerification", userSchema);
export default Users;
