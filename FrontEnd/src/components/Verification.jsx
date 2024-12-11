import React, { useState } from "react";
import "../styles/verification.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [userOtp, setUserOtp] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userOtp === "") {
      return toast.error("please Enter Otp");
    }
    const callApi = await fetch("http://localhost:6001/checkotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ OTP: userOtp }),
    });
    const response = await callApi.json();
    if (response.error) {
      return toast.error(response.error);
    }
    navigate("/home");
  };
  return (
    <div className="verification-container">
      <h2>OTP Verification</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="OTP"
          onChange={(e) => setUserOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Verification;
