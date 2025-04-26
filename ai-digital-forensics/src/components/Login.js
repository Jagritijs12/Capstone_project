import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setErrors({});
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setErrors({ server: data.message || "Login failed." });
        } else {
          console.log("Login success:", data);
  
          // 👇 Navigate to home page
          navigate("/home", {
            state: {
              user: {
                email: formData.email,
              },
            },
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ server: "An unexpected error occurred." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
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
            <i className="fas fa-lock"></i> Password:
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

        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>

      <a href="register">Register Here</a>

      <div className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </div>

      <div className="social-login">
        <button className="google-btn">
          <i className="fab fa-google"></i> Sign in with Google
        </button>
        <button className="facebook-btn">
          <i className="fab fa-facebook"></i> Sign in with Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
