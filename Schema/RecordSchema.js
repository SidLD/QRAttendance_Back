import mongoose, { Schema, model, now } from "mongoose";

const recordSchema = Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    date:{
        type : Date,
        default: now()
    },
    clockIn: Date,
    clockInCutOff: Date,
    clockOut: Date

  }
);

export default model("Record", recordSchema);
