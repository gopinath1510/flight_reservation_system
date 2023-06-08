import mongoose,{model,Schema} from "mongoose";

const Admin=new Schema({
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
      flights: [{ type: mongoose.Types.ObjectId, ref: "Flight" }],
    });

export default model("Admin",Admin);