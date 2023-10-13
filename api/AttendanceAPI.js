import express from 'express'
import dotenv from 'dotenv'
const apiVersion = process.env.API_VERSION;
dotenv.config()
import {verifyToken} from '../lib/verifyToken.js';
import { createAttendance, getAttendance } from '../controller/AttendanceController.js';


const attendaceAPI = express()

attendaceAPI.get(`/${apiVersion}/attendance`, getAttendance)
attendaceAPI.post(`/${apiVersion}/attendance`, createAttendance);

export default attendaceAPI
