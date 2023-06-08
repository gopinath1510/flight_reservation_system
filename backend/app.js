import Userrouter from "./Routing/Userroute.js";
import Adminrouter from "./Routing/Adminrouter.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app=express();

app.use(cors());
app.use(express.json());
app.use("/user",Userrouter);
app.use("/admin",Adminrouter);



mongoose.connect("mongodb+srv://gopinathbcse2020:gopinath2002@cluster0.2ue5k35.mongodb.net/?retryWrites=true&w=majority").then(()=>app.listen(3001,()=>{console.log("connection success")})).catch(err=>console.log(err));
// app.listen(3000,()=>console.log("connection success"));