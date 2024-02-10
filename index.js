import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import userAPI from './api/UserAPI.js'
import mongoose from 'mongoose'
import attendaceAPI from './api/AttendanceAPI.js'
import recordAPI from './api/RecordAPI.js'

//Setup
const app = express()
dotenv.config()
const urlencodedParser = bodyParser.urlencoded({extended:false})
app.use(bodyParser.json(), urlencodedParser);
const corsOptions = {
    origin: process.env.FRONT_URI // frontend URI (ReactJS)
}
app.use(cors(corsOptions));

//Start of API
app.use(userAPI)
app.use(recordAPI)
app.use(attendaceAPI)
//END of API
app.post('*', (req, res) => {
    res.status(404).send({message: "URI not FOUND"})
})
app.get('*', (req, res) => {
    res.status(404).send({message: "URI not FOUND"})
})
app.put('*', (req, res) => {
    res.status(404).send({message: "URI not FOUND"})
})
app.delete('*', (req, res) => {
    res.status(404).send({message: "URI not FOUND"})
})

//Database
try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.ATLAS_URI);
} catch (error) {
    console.log(error.message)
}
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Running at port  ${port}`)
});
