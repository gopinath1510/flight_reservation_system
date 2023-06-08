import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;
import mongoose, { mongo, startSession } from "mongoose";
import Admin from "../Models/Adminmodel.js";
import Flight from '../Models/Flight.js';
import Booked from '../Models/Booked.js';
import User from '../Models/User.js';


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  const hashedPassword = hashSync(password);

  let admin;
  try {
    admin = new Admin({ email, name, password: hashedPassword });
    await admin.save();
  } catch (err) {
    return console.log(err);
  }

  if (!admin) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(201).json({ admin });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.length < 6) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  let existingadmin;
  try {
    existingadmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingadmin) {
    return res.status(404).json({ message: "No admin found" });
  }
  const isPasswordCorrect = compareSync(password, existingadmin.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ id: existingadmin._id, message: "Login Successfull" });
};


export const addFlight = async (req, res) => {
    const { flightnumber,flightname,departure,destination,date,time,creator,ticketprice} = req.body;
  
    if (
      !flightnumber &&
      flightnumber.trim() === "" &&
      !flightname &&
      flightname.trim() === "" &&
      !departure &&
      departure.trim() === "" &&
      !destination &&
      destination.trim() === "" &&
      !time &&
      time.trim() === "" &&
      !date &&
      !creator&&
      !ticketprice
    ) {
      return res.status(422).json({ message: "Invalid Data" });
    }
  
    let existingadmin;
    try {
      existingadmin = await Admin.findById(creator);
    } catch (err) {
      return console.log(err);
    }
  
    if (!existingadmin) {
      return res.status(404).json({ message: "User not found" });
    }
  
    let flight;
  
    try {
      flight = new Flight({
       flightnumber,
       flightname,
       departure,
       destination,
       date,
       time,
       seatleft:60,
       ticketprice,
       creator
      });
  
      const session = await mongoose.startSession();
      session.startTransaction();
      existingadmin.flights.push(flight);
  
      await existingadmin.save({ session });
      flight = await flight.save({ session });
      session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
  
    if (!flight) {
      return res.status(500).json({ message: "Unexpected Error Occurred" });
    }
    return res.status(201).json({ flight });
  };

  
    export const Adminflight = async (req, res) => {
      const id = req.params.id;
    
      let admin;
      try {
        admin = await Admin.findById(id).populate("flights");
      } catch (err) {
        return console.log(err);
      }
      if (!admin) {
        return res.status(404).json({ message: "No admin found" });
      }
    
      return res.status(200).json({ admin });
    };


    export const cancelflight=async(req,res)=>{
         const flightid=req.params.id;
         let flight
         try{
            flight=await Flight.findById(flightid)
         }catch(err){
          return console.log(err)
         }
         let booking=await Booked.find({"flightid":flightid})
         booking.forEach(async(element)=> {
          let user=await User.findById(element.userid)
          user.booked.pop(element);
          user.save()
         });
        // console.log(booking)
        let admin=await Admin.findById(flight.creator)
        admin.flights.pop(flight)
        admin.save()
         await Booked.deleteMany({"flightid":flightid})
         await Flight.findByIdAndDelete(flightid)

         return res.status(200).json({message:"flight canncelled successfully"});
         
    }


    export const getallflights=async(req,res)=>{
      let flight;
  try {
    flight = await Flight.find();
  } catch (err) {
    return console.log(err);
  }

  if (!flight) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ flight });
    }


    export const flightbookings=async(req,res)=>{
      let flightid=req.params.id;
      let flight=await Flight.findById(flightid).populate("users")
      return res.status(200).json({flight})
    }



    export const admindetails=async(req,res)=>{
      const adminid=req.params.id;
      const admin=await Admin.findById(adminid).populate("flights")
      return res.status(200).json({admin})
    }