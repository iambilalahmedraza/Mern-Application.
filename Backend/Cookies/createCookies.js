import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const createCookie = (userId, res) => {
  const sign = jwt.sign({ userId }, process.env.secretjwt, {
    expiresIn: "15d",
  });
  console.log(sign);
  res.cookie("jwt", sign, {
    maxAge: 9000000,
    sameSite: true,
  });
};
export default createCookie;
