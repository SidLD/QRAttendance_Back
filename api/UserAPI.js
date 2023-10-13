import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const userAPI = express()
import {
    login,
    register,
} from '../controller/UserController.js'
import {verifyToken} from '../lib/verifyToken.js';
const apiVersion = process.env.API_VERSION;
userAPI.post(`/${apiVersion}/login`, login)
userAPI.post(`/${apiVersion}/register`, register);
// userAPI.get(`/${apiVersion}/users`, verifyToken, getUsers)
// userAPI.put(`/${apiVersion}/users`,verifyToken, updateUser)
// userAPI.delete(`/${apiVersion}/users`,verifyToken, deleteUser)

export default userAPI
