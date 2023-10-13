import mongoose from 'mongoose'
import User from '../Schema/UserSchema.js'

export const clockIn = async (req, res) => {
    //userId attendanceId
    try {
        const params = req.body
        const ifUserExist = await User.findOne({_id: mongoose.Schema.ObjectId(params.userId)})
        const attendance = await Record.findOne({_id: mongoose.Types.ObjectId(params.attendanceId)})
        if(ifUserExist){
            const isMatch = await bcrypt.compare(params.password, user.password)
            if(isMatch){
                const payload = {
                    id: ifUserExist.id,
                };
                
            }
            else{
                res.status(400).send({ok:false, data:"Incorrect Email or Password" })
            }
        }else{
            res.status(400).send({ok:false, data:"Incorrect Email or Password" })
        }
    } catch (error) {
        res.status(400).send({ok:false,message: error.message})
    }
}



