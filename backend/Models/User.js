import mongoose ,{Schema,model} from "mongoose";
const User=new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minLength: 6,
      },
      booked: [{ type: mongoose.Types.ObjectId, ref: "Booked" }],
})
export default model("User",User);