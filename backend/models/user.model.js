import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // optional but recommended
  },
  qualification: {
    type: String,
  },
  professionalField: {
    type: String,
  },
  address: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    url: { type: String, default: "" },
    public_id: { type: String, default: "" }
}
});

const User = model("User", userSchema);
export default User;