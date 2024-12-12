import React, { useState } from "react";
import "../styles/register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      userInput.username === "" ||
      userInput.email === "" ||
      userInput.password === ""
    ) {
      return toast.error("Every input field must have a value...");
    }
    setLoading(true);
    const callAPI = await fetch("http://localhost:6001/registrationcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const response = await callAPI.json();

    if (response.error) {
      toast.error(response.error);
      return setLoading(false);
    }
    navigate("/verification");
  };
  return (
    <div className="register-container">
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Please Enter Username"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="Please Enter Email"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="Please Enter Username"
        />
        <Link to="/signin">Already have an Account?Login</Link>
        <button type="submit" className="text-white">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;
