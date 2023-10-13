import mongoose, { Schema, model, now } from "mongoose";

const attendanceSchema = Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    timestamps: true,
    clockInCutOff: Date,
    daysInAWeek: [
        {
            type : String,
            enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        }
    ]
  }
);

export default model("Attendance", attendanceSchema);
