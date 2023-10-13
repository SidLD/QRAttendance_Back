import mongoose from 'mongoose'

export const createAttendance = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        
        res.status(200).send({ok:true, data:"Success" })
    } catch (error) {
        res.status(400).send({ok:false,message: error.message})
    }
}

export const getAttendance = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        
        res.status(200).send({ok:true, data:"Success" })
    } catch (error) {
        res.status(400).send({ok:false,message: error.message})
    }
}



