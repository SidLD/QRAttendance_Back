import User from '../Schema/UserSchema.js'
import Attendance from '../Schema/AttendanceSchema.js'
import Record from '../Schema/RecordSchema.js'
import mongoose from 'mongoose'

//  const checkAttendance = (date1, date2) => {
//     const now = new Date()
//     let timeIn = new Date(date1)
//     let timeInCutOff = new Date(date2)
//     timeIn.setDate(now.getDate())
//     timeInCutOff.setDate(now.getDate())
//     return timeIn <= now && timeInCutOff >= now
//   }
export const clockIn = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        const ifUserExist = await User.findOne({_id: new mongoose.Types.ObjectId(params.userId)})
        if(ifUserExist){
            const now = new Date()
            const attendance = await Attendance.findOne({ _id:new mongoose.Types.ObjectId(params.attendanceId),});
            const ifRecord = await Record.findOne({
                user:new mongoose.Types.ObjectId(params.userId),
                attendance:new mongoose.Types.ObjectId(params.attendanceId),
                'date.day': now.getDate(),
                'date.month': now.getMonth(),
                'date.year': now.getFullYear()
            })
            if(!ifRecord){
                let newRecord
                if(params.type == 1){
                    //Check if can Attendance
                    let timeIn = new Date(attendance.clockIn)
                    let timeInCutOff = new Date(attendance.clockInCutOff)
                    if( timeIn <= now && timeInCutOff >= now){
                         newRecord = new Record({
                            user: new mongoose.Types.ObjectId(params.userId),
                            clockIn: new Date(),
                            attendance:  new mongoose.Types.ObjectId(params.attendanceId),
                            date: {
                                day: now.getDate(),
                                month: now.getMonth(),
                                year: now.getFullYear()
                            }
                        })
                    }
                   
                }else if(params.type == 2){
                    let timeOut = new Date(attendance.clockOut)
                    let timeOutCutOff = new Date(attendance.clockOutCutOff)
                    if( timeOut <= now && timeOutCutOff >= now){
                        newRecord = new Record({
                            user: new mongoose.Types.ObjectId(params.userId),
                            clockIn: null,
                            clockOut: new Date(),
                            attendance:  new mongoose.Types.ObjectId(params.attendanceId),
                            date: {
                                day: now.getDate(),
                                month: now.getMonth(),
                                year: now.getFullYear()
                            }
                        })
                    }
                }
                if(newRecord){
                    await newRecord.save()
                    res.status(200).send({ok:true, data:`User ${ifUserExist.firstName} ${ifUserExist.lastName} Succeffully ${params.type}` })
                }else{
                    res.status(400).send({ok:true, data:`Attendance is Close` })
                }
            }else{
                let isOpen  = false;
                console.log(params);
                if(params.type == 1 && !ifRecord.clockIn){
                    //Check if can Attendance
                    let timeIn = new Date(attendance.clockIn)
                    let timeInCutOff = new Date(attendance.clockInCutOff)
                    if( timeIn <= now && timeInCutOff >= now){
                        isOpen = true;
                        await Record.updateOne({_id: new mongoose.Types.ObjectId(ifRecord._id)}, {clockIn: new Date()})
                    }
                }

                if(params.type == 2){
                    let timeOut = new Date(attendance.clockOut)
                    let timeOutCutOff = new Date(attendance.clockOutCutOff)
                    if( timeOut <= now && timeOutCutOff >= now){
                        isOpen = true;
                        await Record.updateOne({_id: new mongoose.Types.ObjectId(ifRecord._id)}, {clockOut: new Date()})
                    }
                }
                if(isOpen){
                    res.status(200).send({ok:true, data:`User ${ifUserExist.firstName} ${ifUserExist.lastName} Succeffully ${params.type}` })
                }else{
                    res.status(400).send({ok:true, data:`Attendance is Either Close or You already have record` })
                }
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
        console.log(req.user.role)
        if(req.user.role === 'admin') {
            const params = req.query;
            const data = await Record.where({
                'date.day': params.day,
                'date.month': params.month,
                'date.year': params.year
            })
            .populate('user', 'firstName lastName clockIn clockOut')
            .populate('attendance', 'title')
            .sort('attendance.title')
            console.log(data)
            res.status(200).send({ok:true, data })
        }else{
            const params = req.query;
            const data = await Record.where({
                'date.day': params.day,
                'date.month': params.month,
                'date.year': params.year,
                user: new mongoose.Types.ObjectId(req.user.id)
            })
            .populate('user', 'firstName lastName clockIn clockOut')
            .populate('attendance', 'title')
            .sort('attendance.title')
            res.status(200).send({ok:true, data })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ok:false, message: error.message})
    }
}

