import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username already exists!"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
