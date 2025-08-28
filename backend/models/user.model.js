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
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  skills: [{
    type: String,
    default: []
  }],
  bio: {
    type: String,
    default: "",
  },
  experience: {
    type: String,
    default: "",
  },
  contact: {
    phone: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    website: { type: String, default: "" }
  },
  profilePicture: {
    url: { type: String, default: "" },
    public_id: { type: String, default: "" }
  },
  qualification: {
    type: String,
    default: "",
  },
  professionalField: {
    type: String,
    default: "",
  },
  contactNumber: {
    type: String,
    default: "",
  }
}, {
  timestamps: true
});

const User = model("User", userSchema);
export default User;