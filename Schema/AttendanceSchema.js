import mongoose, { Schema, model, now } from "mongoose";

const attendanceSchema = Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    timestamps: true,
    attendanceDate:{
      type: Date,
      default: now()
    },
    clockInStart: Date,
    clockOutCutOff: Date,
    clockInCutOff: Date,
    type: {
      type: String,
      enum: ['one-time', 'daily']
    },
    daysInAWeek: [
        {
            type : String,
            enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        }
    ]
  }
);

export default model("Attendance", attendanceSchema);
