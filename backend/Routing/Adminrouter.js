import {Router} from "express";
import { signup } from "../controllers/Admincontrols.js";
import { login } from "../controllers/Admincontrols.js";
import { addFlight } from "../controllers/Admincontrols.js";
import { cancelflight } from "../controllers/Admincontrols.js";
import { Adminflight } from "../controllers/Admincontrols.js";
import { getallflights } from "../controllers/Admincontrols.js";
import { flightbookings } from "../controllers/Admincontrols.js";
import { admindetails } from "../controllers/Admincontrols.js";
const Adminrouter=Router();
Adminrouter.post("/signup",signup);
Adminrouter.post("/login",login);
Adminrouter.post("/addflight",addFlight);
Adminrouter.delete("/cancelflight/:id",cancelflight);
Adminrouter.get("/adminflight/:id",Adminflight);
Adminrouter.get("/getallflights",getallflights);
Adminrouter.get("/flightbooking/:id",flightbookings);
Adminrouter.get("/admindetail/:id",admindetails)
export default Adminrouter;