import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import '../App.css';
export const Login = () => {
  const naviagte = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store the user ID in local storage
        localStorage.setItem('userId', data.id);
        naviagte("/dashboard")
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
  };

  return (
    <div>
      <h2>Login </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
        <h1>New User! Signup here</h1>
        <button onClick={()=>naviagte("/signup")}>signup</button>
    </div>
  );
};

export const AdminLogin = () => {
  const naviagte = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/admin/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store the user ID in local storage
        localStorage.setItem('userId', data.id);
        naviagte("/admindashboard")
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
  };

  return (
    <div>
      <h2>Login </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

