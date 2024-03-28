/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    designation: "",
    password: "",
    otp: "",
  });

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false); // Track email validation
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      parseEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      parseEmail(value);
    }
  };

  const parseEmail = (email) => {
    email = email.trim(); // Trim leading and trailing spaces
    if (email.endsWith("@students.iitmandi.ac.in")) {
      setIsValidEmail(true);
      if (email.toLowerCase().startsWith("b")) {
        setFormData({ ...formData, designation: "B-Tech" });
      } else {
        setFormData({ ...formData, designation: "PHD/M-Tech" });
      }
    } else if (email.endsWith("@iitmandi.ac.in")) {
      setIsValidEmail(true);
      setFormData({ ...formData, designation: "Faculty/Staff" });
    } else {
      setIsValidEmail(false);
      setFormData({ ...formData, designation: "" });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      alert("Please enter a valid college email ID.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/auth/signup", {
        ...formData,
        email,
      });
      console.log(res.data);
      console.log("Submitted");
      navigate("/form");
      // signup(); // Authenticate the user
    } catch (err) {
      alert("Email already registered");
      console.error("Error occurred:", err);
    }
  };

  const { name, phoneNumber, password, otp } = formData;

  return (
    <div className="App">
      <h2>Sign-Up New User</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="designation">Choose Degree:</label>
        <input
          type="text"
          id="designation"
          name="designation"
          required
          value={formData.designation}
          readOnly
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          required
          value={otp}
          onChange={handleChange}
        />
      </div>
      <span>
        Already have an account <Link to="/login">Login</Link>
      </span>
      <br />
      <button onClick={handleSubmit} disabled={!isValidEmail}>
        Submit
      </button>
    </div>
  );
};

export default Signup;*/






import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Signup.css"; // Import CSS file

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    designation: "",
    password: "",
    otp: "",
  });

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false); // Track email validation
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      parseEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      parseEmail(value);
    }
  };

  const parseEmail = (email) => {
    email = email.trim(); // Trim leading and trailing spaces
    if (email.endsWith("@students.iitmandi.ac.in")) {
      setIsValidEmail(true);
      if (email.toLowerCase().startsWith("b")) {
        setFormData({ ...formData, designation: "B-Tech" });
      } else {
        setFormData({ ...formData, designation: "PHD/M-Tech" });
      }
    } else if (email.endsWith("@iitmandi.ac.in")) {
      setIsValidEmail(true);
      setFormData({ ...formData, designation: "Faculty/Staff" });
    } else {
      setIsValidEmail(false);
      setFormData({ ...formData, designation: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      alert("Please enter a valid college email ID.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/auth/signup", {
        ...formData,
        email,
      });
      console.log(res.data);
      console.log("Submitted");
      navigate("/form");
      // signup(); // Authenticate the user
    } catch (err) {
      alert("Email already registered");
      console.error("Error occurred:", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { name, phoneNumber, password, otp } = formData;

  return (
    <div className="App">
      <h2>Sign-Up New User</h2>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="designation">Choose Degree:</label>
        <input
          type="text"
          id="designation"
          name="designation"
          required
          value={formData.designation}
          readOnly
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            value={password}
            onChange={handleChange}
          />
          <i
            className={`eye-icon ${showPassword ? "visible" : "hidden"}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="otp">OTP:</label>
        <input
          type="text"
          id="otp"
          name="otp"
          required
          value={otp}
          onChange={handleChange}
        />
      </div>
      <span>
        Already have an account <Link to="/login">Login</Link>
      </span>
      <br />
      <button onClick={handleSubmit} disabled={!isValidEmail}>
        Submit
      </button>
    </div>
  );
};

export default Signup;
