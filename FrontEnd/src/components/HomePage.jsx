import React, { useState } from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../authContext/authContext";

const HomePage = ({ heading = "welcome Home" }) => {
  const { setAuthenticatedUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function logout() {
    setLoading(!loading);
    const callAPI = await fetch("http://127.0.0.1:6001/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await callAPI.json();
    if (response.error) {
      return toast.error(response.error);
    }
    setAuthenticatedUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  }
  return (
    <div>
      <h1>{heading} </h1>
      <button onClick={logout}> {loading ? "Loading..." : "Logout"} </button>
    </div>
  );
};

export default HomePage;
