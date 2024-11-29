// src/components/SignupAndLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'; // Assuming this is where you keep your styles

const SignupAndLogin = () => {
  const [isLogin, setIsLogin] = useState(true); // Default to login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  // Handle form submission for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? 'http://localhost:5001/api/login' : 'http://localhost:5001/api/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // If response isn't OK, handle the error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error');
      }

      // Handle success for both login and signup
      if (isLogin) {
        console.log('Login successful:', await response.json());
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else {
        console.log('Signup successful');
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (err) {
      setError('Error: ' + err.message); // Display error message
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <p>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupAndLogin;
