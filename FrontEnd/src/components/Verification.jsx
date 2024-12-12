import React, { useState } from "react";
import "../styles/verification.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Verification = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (value === "") {
      return toast.error("please Enter Otp");
    }
    setLoading(!loading);
    const callApi = await fetch("http://localhost:6001/checkotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ OTP: value }),
    });
    const response = await callApi.json();
    if (response.error) {
      return toast.error(response.error);
    }
    navigate("/home");
  };
  return (
    <div className="verification-container text-white font-bold">
      <h2>OTP Verification</h2>
      <form action="" onSubmit={handleSubmit}>
        {/* <input
          type="text"
          name="OTP"
          onChange={(e) => setUserOtp(e.target.value)}
          placeholder="Enter OTP"
        />
     */}

        <div className="space-y-2 ">
          <InputOTP
            maxLength={4}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup className="otp-group">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            {value === "" ? <>Enter your one-time password.</> : ""}
          </div>
          <button type="submit">{loading ? "Loading..." : "Verify"}</button>
        </div>
      </form>
    </div>
  );
};

export default Verification;
