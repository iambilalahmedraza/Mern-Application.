import React, { useState } from "react";
import "../styles/forgot.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [userInput, setUserInput] = useState({ email: "", newpassword: "" });
  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInput.email === "" || userInput.newpassword === "") {
      toast.error("Enter All fields TO continue");
    }
    const callApi = await fetch("http://localhost:6001/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });

    const response = await callApi.json();
    if (response.error) {
      return toast.error(response.error);
    }
    toast.success(response.message);
    navigate("/signin");
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          onChange={handleChange}
          name="email"
          placeholder="johndoe@gmail.com"
        />
        <label htmlFor="newpassword">New Password :</label>
        <input
          type="text"
          id="newpassword"
          onChange={handleChange}
          name="newpassword"
        />
        <Link to="/signin"> redirect to login</Link>
        <button>Reset Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
