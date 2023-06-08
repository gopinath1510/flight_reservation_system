import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../../App.css';
const Signup = () => {
  const naviagte = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/user/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email, password }),
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
      <h1>Signup </h1>
      <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
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
      <h1>Aldready having an account</h1>
      <button onClick={()=>naviagte("/login")}>login</button>
    </div>
  );
};

export default Signup;