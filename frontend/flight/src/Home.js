import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome! flight reservation on the go!</h1>
      <h2>who are you?</h2>
      <button onClick={() => navigate("/login")}>User</button>
      <button onClick={() => navigate("/adminlogin")}>Admin</button>
    </>
  );
};

export default Home;
