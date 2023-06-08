

import { Route, Routes } from "react-router-dom";
import {Login,AdminLogin} from "./components/Auth/Auth/Login";
import Adminhome from "./Adminhome";
import Userhome from "./Userhome";
import Signup from "./components/Auth/Auth/Signup";
import Home from "./Home";
function App(){


  return (
  <section>
    <h1 style={{ textAlign: "center" }}> Flight reservation Application</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admindashboard" element={<Adminhome />} />
          <Route path="/dashboard" element={<Userhome />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </section>
    
  );

}

export default App;