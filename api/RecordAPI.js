import express from 'express'
import dotenv from 'dotenv'
const apiVersion = process.env.API_VERSION;
dotenv.config()
import {verifyToken} from '../lib/verifyToken.js';
import { clockIn, getAttendanceRecord, getAttendanceRecordWithDate } 
    from '../controller/RecordController.js';


const recordAPI = express()

recordAPI.post(`/${apiVersion}/record/clock-in`, verifyToken, clockIn);
recordAPI.get(`/${apiVersion}/records/:attendanceId`, verifyToken, getAttendanceRecord);
recordAPI.get(`/${apiVersion}/records-date`, verifyToken, getAttendanceRecordWithDate);


export default recordAPI
