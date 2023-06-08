import pkg from 'bcryptjs';
const { compareSync, hashSync } = pkg;
import mongoose, { mongo, startSession } from "mongoose";
import User from '../Models/User.js';
import Booked from '../Models/Booked.js';
import Flight from '../Models/Flight.js';



// export const getuserById = async (req, res) => {
//   const id = req.params.id;

//   let user;
//   try {
//     user = await user.findById(id).populate("posts");
//   } catch (err) {
//     return console.log(err);
//   }
//   if (!user) {
//     return res.status(404).json({ message: "No user found" });
//   }

//   return res.status(200).json({ user });
// };

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

  let user;
  try {
    user = new User({ email, name, password: hashedPassword });
    await user.save();
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(201).json({ user });
};



//login




export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.length < 6) {
    return res.status(422).json({ message: "Inavalid Data" });
  }

  let existinguser;
  try {
    existinguser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existinguser) {
    return res.status(404).json({ message: "No user found" });
  }
  const isPasswordCorrect = compareSync(password, existinguser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ id: existinguser._id, message: "Login Successfull" });
};


//bookflight



export const Bookflight=async(req,res)=>{
    const{userid,flightid,numberofseats}=req.body;
    let existinguser;

    try{
        existinguser=await User.findById(userid);

    }catch(err){
        return console.log(err)
    }

    if(!existinguser){
        return res.status(404).json({message:"user not found"})
    }

    let flight;
    try{
        flight=await Flight.findById(flightid);
    }catch(err){
        return console.log(err)
    }

    if(flight.seatleft<numberofseats){
        return res.status(404).json({message:"Insufficient seats"})
    }
     let newseatleft=flight.seatleft-numberofseats
     let totalpay=flight.ticketprice*numberofseats
     flight.users.push(existinguser)
     flight.save();
    flight=await Flight.findByIdAndUpdate(flightid,{seatleft:newseatleft})
    // console.log(flight);
    let book;
    try{
        book=new Booked({
            userid,
            flightid,
            numberofseats,
            bookeddate:new Date(),
            totalpay
        })
    
    const session=await mongoose.startSession();
    session.startTransaction();
    existinguser.booked.push(book);
    
    await existinguser.save({session})
    book=await book.save({session});
    session.commitTransaction();
    }catch(err){
        return console.log(err)
    }
    if(!book){
        return res.status(500).json({messgae:"unexpected error"})
    }
    return res.status(200).json({book})

}



//getall booked flights

export const getbookedflights=async(req,res)=>{
  const userid=req.params.id;
  console.log(userid)
  let user;
  try{
    user=await User.findById(userid).populate("booked");
  }catch(err){
    return console.log(err)
  }

  if(!user){
    return res.status(500).json({message:"no user found"})
  }
 
  return res.status(200).json({user})

}



export const findflight=async(req,res)=>{
  const {departure,destination,date}=req.body;
  let flight
  try{
    flight=await Flight.find({"departure":departure,"destination":destination,"date":date})
  }catch(err){
    return console.log(err)
  }

  if(flight.length==0){
    return res.status(500).json({message:"Sorry! No flight available at specified details"})
  }
  return res.status(200).json({flight})
}

export const cancelticket=async(req,res)=>{
  const bookingid=req.params.id;
  let book
  try{
    book=await Booked.findById(bookingid);

  }catch(err){
    return console.log(err)
  }
  let numberofseats=book.numberofseats
  let flightid=book.flightid
  let flight=await Flight.findById(flightid)
  let user=await User.findById(book.userid)
  let seatsleft=flight.seatleft+numberofseats
  await Flight.findOneAndUpdate(flightid,{"seatleft":seatsleft})
  flight.users.pop(user)
  flight.save();
  user.booked.pop(book)
  await user.save()
  await Booked.findByIdAndDelete(bookingid);
  res.status(200).json({message:"successfully deleted"})
}

export const getuserdetials=async(req,res)=>{
   const userid=req.params.id;
   let user
   try{
    user =await User.findById(userid).populate("booked");
   }catch(err){
    console.log(err)
   }
   if(!user){
    return res.status(404).json({message:"No user found"})
   }
   return res.status(200).json({user})
}