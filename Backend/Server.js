import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Users from "./Models/userModel.js";
import bcrypt from "bcrypt";
import connection from "./Database/connection.js";
import createCookie from "./Cookies/createCookies.js";
dotenv.config();

const port = process.env.port;

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hi From backend ");
});
const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iambilalahmedraza@gmail.com",
    pass: process.env.pass,
  },
});
transpoter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("nodemailer connection success");
  }
});
app.post("/registrationcheck", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const checkEmail = await Users.findOne({ email });
    if (checkEmail) {
      return res.status(409).json({ error: "Email Already Exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);

    const OTP = Math.floor(1000 + Math.random() * 9000);
    console.log(OTP);
    const newUser = new Users({
      username: username,
      email: email,
      password: hashedPass,
      OTP: OTP,
    });
    const mailOptions = {
      from: "iambilalahmedraza@gmail.com",
      to: email,
      subject: "Otp for registration",
      html: `
      <div style="background-color:#242424;color:white;padding:20px;border-radius:10px;text-align:center;font-size:20px;">
      <p>hi ${username}</p>
      <p>Your OTP for account creation is ${OTP} </p>
      </div>
      `,
    };
    transpoter.sendMail(mailOptions, (err, success) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({ msg: "otp send Successfully" });
      }
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});
app.post("/checkotp", async (req, res) => {
  const userOtp = parseInt(req.body.OTP);
  try {
    const checkOtpp = await Users.findOne({ OTP: userOtp });
    if (checkOtpp && checkOtpp.OTP !== undefined && checkOtpp.OTP === userOtp) {
      return res.status(200).json({ messsage: "otp verified" });
    }
    return res.status(400).json({ error: "incorrect otp" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal Server error " });
  }
});
app.post("/logincheck", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findMail = await Users.findOne({ email });
    const findpassword = await bcrypt.compare(password, findMail.password);
    if (findMail && findpassword) {
      const token = createCookie(findMail._id, res);
      return res.status(200).json({ message: "userLogged in " });
    }
    return res.status(404).json({ error: "inValid email or password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});
app.post("/forgot", async (req, res) => {
  const { email, newpassword } = req.body;
  try {
    const checkmail = await Users.findOne({ email });
    if (!checkmail) {
      return res.status(401).json({ error: "Email Not found" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(newpassword, salt);
    checkmail.password = hashedPass;
    await checkmail.save();
    return res.status(200).json({ message: "SuccesFully Changed password" });
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logged Out" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/send-email", async (req, res) => {
  try {
    const users = await Users.find({});
    console.log(users);
    const allUsersEmail = users.map((user) => {
      const mailOptions = {
        from: "patiencecoder@gmail.com",
        to: user.email,
        subject: "Offer Alert",
        html: `
            <div style="background-color:#242424;color:white;padding:20px;border-radius:10px;text-align:center;font-size:20px;">
                <p>Hi ${user.username}👋</p>
                <p>I hope you are doing good we have an offer for you please checkout our app to know more about it 😃😃</p>
            </div>
            `,
      };
      return transpoter.sendMail(mailOptions);
    });
    console.log(allUsersEmail);
    await Promise.all(allUsersEmail);
    console.log(allUsersEmail);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`App is Running on Port ${port}`);
  connection();
});
