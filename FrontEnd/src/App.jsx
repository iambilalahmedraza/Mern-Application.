import "./App.css";
import { Toaster } from "react-hot-toast";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Verification from "./components/Verification";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import { useAuthContext } from "../authContext/authContext";

function App() {
  const { authenticatedUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/verification" element={<Verification />} />

        <Route
          path="/home"
          element={<HomePage heading="Welcome to home Page" />}
        />
        <Route
          path="/signin"
          element={authenticatedUser ? <HomePage /> : <SignIn />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
