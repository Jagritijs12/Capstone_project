import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setErrors({ server: data.message || "Registration failed." });
        } else {
          console.log("User registered successfully", data);
  
          // 👇 Redirect to Home with user info
          navigate("/home", {
            state: {
              user: {
                name: formData.name,
                email: formData.email,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setErrors({ server: "An unexpected error occurred." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <i className="fas fa-user"></i> Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i> Email-ID:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i> Set Password:
          </label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} show-password`}
              title="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            <i className="fas fa-lock"></i> Confirm Password:
          </label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} show-password`}
              title="Toggle Password Visibility"
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        {errors.server && <p className="error">{errors.server}</p>}

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Submitting..." : "REGISTER"}
        </button>
      </form>

      <a href="/" >Login Here</a>

      <div className="social-login">
        <button className="google-btn">
          <i className="fab fa-google"></i> Sign up with Google
        </button>
        <button className="facebook-btn">
          <i className="fab fa-facebook"></i> Sign up with Facebook
        </button>
      </div>
    </div>
  );
};

export default Register;
