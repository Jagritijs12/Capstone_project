import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { auth, googleProvider, githubProvider } from './firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      await axios.post('http://localhost:5001/api/register', { name, email, password });
      navigate('/home');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
    }
  };

  const handleSocialRegister = (provider) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        await axios.post('http://localhost:5001/api/register', {
          name: user.displayName || 'No Name',
          email: user.email,
          password: user.uid || Math.random().toString(36).slice(-8),
        });

        navigate('/home');
      })
      .catch((err) => {
        setError('Social registration failed: ' + err.message);
      });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <button className="google-btn" onClick={() => handleSocialRegister(googleProvider)}>Continue with Google</button>
      <button className="github-btn" onClick={() => handleSocialRegister(githubProvider)}>Continue with GitHub</button>
    </div>
  );
};

export default RegisterPage;