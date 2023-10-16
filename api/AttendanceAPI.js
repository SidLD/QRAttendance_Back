import express from 'express'
import dotenv from 'dotenv'
const apiVersion = process.env.API_VERSION;
dotenv.config()
import {verifyToken} from '../lib/verifyToken.js';
import { createAttendance, deleteAttendance, getAllAttendance, getAttendance } from '../controller/AttendanceController.js';


const attendaceAPI = express()

attendaceAPI.get(`/${apiVersion}/attendances`, verifyToken, getAllAttendance)
attendaceAPI.get(`/${apiVersion}/attendances/:attendanceId`,verifyToken, getAttendance);
attendaceAPI.post(`/${apiVersion}/attendance`,verifyToken, createAttendance);
attendaceAPI.delete(`/${apiVersion}/attendances/:attendanceId`,verifyToken, deleteAttendance);

export default attendaceAPI
