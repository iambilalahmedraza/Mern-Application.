import React, { useState } from "react";
import "../styles/signin.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.email === "" || userInput.password === "") {
      return toast.error("Every field must be filled");
    }
    setLoading(true);

    const callApi = await fetch("http://localhost:6001/logincheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const response = await callApi.json();
    if (response.error) {
      toast.error(response.error);
      return setLoading(false);
    }
    if (response.message === "no account with this email ") {
      toast.error("no account with this email ");
      return setLoading(false);
    }
    toast.success("succesFully Logged In");
    localStorage.setItem("currentUser", JSON.stringify(response));
    navigate("/home");
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          onChange={handleChange}
          name="email"
          placeholder="johndoe@gmail.com"
        />
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          name="password"
        />
        <div className="routes">
          <Link to="/">Don't have an account ? register</Link>
          <Link to="/forgotpassword">forgot password?</Link>
        </div>
        <button className="text-white">
          {" "}
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
