import mongoose, { Schema, model, now } from "mongoose";

const recordSchema = Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User'
    },
    attendance: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Attendance"
    },
    date:{
        day: String,
        month: String,
        year: String,
    },
    clockIn: Date,
    clockOut: Date

  }
);

export default model("Record", recordSchema);
