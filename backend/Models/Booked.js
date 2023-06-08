import mongoose,{Schema,model} from "mongoose";
const Booked=new Schema({
    userid:{type: mongoose.Types.ObjectId, ref: "User"},
    flightid:{type: mongoose.Types.ObjectId, ref: "Flight"},
    numberofseats:{
        type:Number,
        required:true
    },
    bookeddate:{
        type:Date,
        required:true
    },
    totalpay:{
        type:Number,
        required:true
    }
})
export default model("Booked",Booked);