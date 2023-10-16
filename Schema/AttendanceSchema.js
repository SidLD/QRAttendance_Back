import mongoose, { Schema, model, now } from "mongoose";

const attendanceSchema = Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User'
    },
    title: String,
    clockIn: Date,
    clockInCutOff: Date,
    clockOut: Date,
    clockOutCutOff: Date,
    daysInAWeek: [
        {
          required: true,
          type : String,
          enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        }
    ]
  },
  {
    timestamps: true,
  }
);

export default model("Attendance", attendanceSchema);
