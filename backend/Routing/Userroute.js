import { Router } from "express";
const Userrouter=Router();
import { signup } from "../controllers/Usercontrols.js";
import { login } from "../controllers/Usercontrols.js";
import { Bookflight } from "../controllers/Usercontrols.js";
import { getbookedflights } from "../controllers/Usercontrols.js";
import { findflight } from "../controllers/Usercontrols.js";
import { cancelticket } from "../controllers/Usercontrols.js";
import { getuserdetials } from "../controllers/Usercontrols.js";
Userrouter.post("/signup",signup)
Userrouter.post("/login",login)
Userrouter.post("/bookflight",Bookflight);
Userrouter.get("/getbookedflights/:id",getbookedflights);
Userrouter.delete("/cancelticket/:id",cancelticket);
Userrouter.post("/findflight",findflight);
Userrouter.get("/getuserdetails/:id",getuserdetials);

export default Userrouter;