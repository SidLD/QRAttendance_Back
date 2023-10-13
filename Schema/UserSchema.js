import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    middleName: String,
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      trim: true,
      index: true,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
