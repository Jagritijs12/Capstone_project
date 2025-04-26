// HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/session-over');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome</h1>
      {user ? (
        <>
          <p>Hello, {user.displayName || user.email}!</p>
          <button onClick={handleLogout} style={btnStyle}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/login')} style={btnStyle}>Login</button>
          <button onClick={() => navigate('/register')} style={btnStyle}>Register</button>
        </>
      )}
    </div>
  );
};

const btnStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default HomePage;
