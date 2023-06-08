import mongoose,{model,Schema} from "mongoose";

const Flight=new Schema({
    flightnumber:{
        type:Number,
        required:true
    },
    flightname:{
        type:String,
        required:true
    },
    departure:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    seatleft:{
        type:Number,
        required:true
    },
    ticketprice:{
        type:Number,
        required:true
    },
    creator:{type: mongoose.Types.ObjectId, ref: "Admin",required:true},
    users:[{type: mongoose.Types.ObjectId, ref: "User"}]
})

export default model("Flight",Flight);