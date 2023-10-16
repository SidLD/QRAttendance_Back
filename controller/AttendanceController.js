import mongoose from 'mongoose'
import Attendance from '../Schema/AttendanceSchema.js'
import Record from '../Schema/RecordSchema.js'

export const createAttendance = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        const newAttendance = new Attendance({
            user: new mongoose.Types.ObjectId(req.user.id),
            title: params.title,
            clockIn : new Date(params.clockIn),
            clockInCutOff : new Date(params.clockInCutOff),  
            clockOut : new Date(params.clockOut),
            clockOutCutOff : new Date(params.clockOutCutOff),
            daysInAWeek: [...params.daysInAWeek]
        })
        const data = await newAttendance.save()
        res.status(200).send({ok:true, data: data})
    } catch (error) {
        console.log(error)
        res.status(400).send({ok:false,message: error.message})
    }
}

export const getAllAttendance = async (req, res) => {
    //userId attendanceId
    try {
        const data = await Attendance.where({user: new mongoose.Types.ObjectId(req.user.id)})
        res.status(200).send({ok:true, data })
    } catch (error) {
        res.status(400).send({ok:false, message: error.message})
    }
}

export const getAttendance = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.params
        const data = await Attendance.findOne({_id: new mongoose.Types.ObjectId(params.attendanceId)})
        res.status(200).send({ok:true, data })
    } catch (error) {
        res.status(400).send({ok:false, message: error.message})
    }
}

export const deleteAttendance = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        const attendance = await Attendance.deleteOne({
            _id: new mongoose.Types.ObjectId(params.attendanceId), 
            user: new mongoose.Types.ObjectId(req.user.id)
        })
        if(attendance.acknowledge && attendance.modifiedCount > 0){
            await Record.deleteMany({attendance: new mongoose.Types.ObjectId(params.attendanceId)})
        }
        res.status(200).send({ok:true, data: attendance})
    } catch (error) {
        // console.log(error)
        res.status(400).send({ok:false,message: error.message})
    }
}
export const updateAttendance = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        const {attendanceId} = req.params
        const data = await Attendance.updateOne({_id: new mongoose.Types.ObjectId(attendanceId)},
            {
                title: params.title,
                clockIn : new Date(params.clockIn),
                clockInCutOff : new Date(params.clockInCutOff),  
                clockOut : new Date(params.clockOut),
                clockOutCutOff : new Date(params.clockOutCutOff),
                daysInAWeek: [...params.daysInAWeek]
            }
        )
        console.log(data)
        res.status(200).send({ok:true, data })
    } catch (error) {
        res.status(400).send({ok:false, message: error.message})
    }
}



