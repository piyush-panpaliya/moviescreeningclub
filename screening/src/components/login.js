import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import imageOne from "../images/undraw_secure_login_pdn4.png";
import { useLogin } from "./LoginContext"; // Import the useLogin hook

export default function Login() {
  const { login } = useLogin(); // Use the login function from context
  const [formData, setFormData] = useState({
    email: localStorage.getItem("signupEmail") || "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      login(); // Update login status in context if token exists
      navigate("/home"); // Redirect to form if already logged in
    }
  }, [login, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/login/login",
        formData
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loggedInUserEmail", formData.email);
        // Fetch user type
        const userTypeResponse = await axios.get(
          `http://localhost:8000/user/${formData.email}`
        );
        const userTypeData = userTypeResponse.data;
        const userType = userTypeData.userType;
        localStorage.setItem("userType", userType);
        console.log("successful authentication");
        login(); // Update login status in context upon successful login
        navigate("/home");
      }
    } catch (err) {
      if (err.response.status === 404) {
        alert("User not found");
      } else if (err.response.status === 401) {
        alert("Email or password is wrong");
      } else {
        alert("Internal server error");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex flex-row justify-around items-center w-4/6 h-[70%] rounded-lg bg-white shadow-lg">
        <div className="image1 border-r-2 border-r-blue-600 w-[50%] h-full flex justify-start">
          <img src={imageOne} className="img1 rounded-2xl" alt="Login"/>
        </div>
        <div className="flex  justify-center h-full mt-4 w-1/2">
          <div className="flex flex-col items-between w-[90%] gap-3">
            <h2 className="text-center font-bold text-3xl">Login</h2>
            <hr className="border border-primary opacity-75"/>
            <div className="flex justify-between text-lg">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border w-[85%]"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between text-lg">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border w-[85%]"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Link className="flex justify-end text-blue-600" to="/forgot">forgot password</Link>
            
              <button
                onClick={handleSubmit}
                className="flex justify-center bg-primary p-2 text-white"
                type="button"
              >
                Submit
              </button>
            
            <span className="form-text">
              Don't have an account: <Link className="text-blue-600" to="/getOTP">Signup</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
