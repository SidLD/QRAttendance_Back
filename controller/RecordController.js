import User from '../Schema/UserSchema.js'
import Attendance from '../Schema/AttendanceSchema.js'
import Record from '../Schema/RecordSchema.js'
import mongoose from 'mongoose'


export const clockIn = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        const ifUserExist = await User.findOne({_id: new mongoose.Types.ObjectId(params.userId)})
        if(ifUserExist){
            const now = new Date()
            const ifRecord = await Record.findOne({
                user:new mongoose.Types.ObjectId(params.userId),
                attendance:new mongoose.Types.ObjectId(params.attendanceId),
                'date.day': now.getDate(),
                'date.month': now.getMonth(),
                'date.year': now.getFullYear()
            })
            if(!ifRecord){
                const newRecord = new Record({
                    user: new mongoose.Types.ObjectId(params.userId),
                    clockIn: new Date(),
                    attendance:  new mongoose.Types.ObjectId(params.attendanceId),
                    date: {
                        day: now.getDate(),
                        month: now.getMonth(),
                        year: now.getFullYear()
                    }
                })
                await newRecord.save()
                res.status(200).send({ok:true, data:`User ${ifUserExist.firstName} ${ifUserExist.lastName} Succeffully Login` })
            }else{
                res.status(400).send({ok:false, message:`User Already Log In` })
            }
        }else{
            res.status(400).send({ok:false, message:"User not Found" })
        }
    } catch (error) {
        res.status(400).send({ok:false,message: error.message})
    }
}

export const getAttendanceRecord = async (req, res) => {
    //userId attendanceId
    try {
        const {attendanceId} = req.params
        const now = new Date()
        const data = await Record.where({
            attendance:new mongoose.Types.ObjectId(attendanceId),
            'date.day': now.getDate(),
            'date.month': now.getMonth(),
            'date.year': now.getFullYear()
        }).populate('user', 'firstName lastName')
        res.status(200).send({ok:true, data })
    } catch (error) {
        console.log(error)
        res.status(400).send({ok:false,message: error.message})
    }
}

export const getAttendanceRecordWithDate = async (req, res) => {
    try {
        const params = req.query;
        const data = await Record.where({
            'date.day': params.day,
            'date.month': params.month,
            'date.year': params.year
        })
        .populate('user', 'firstName lastName clockIn clockOut')
        .populate('attendance', 'title')
        .sort('attendance.title')
        res.status(200).send({ok:true, data })
    } catch (error) {
        console.log(error)
        res.status(400).send({ok:false, message: error.message})
    }
}

