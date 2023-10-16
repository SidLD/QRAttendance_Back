import bcrypt from 'bcrypt'
import User from '../Schema/UserSchema.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const params = req.body
        const user = await User.findOne({ email: params.email })
        console.log(user)
        if(user){
            const isMatch = await bcrypt.compare(params.password, user.password)
            if(isMatch){
                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    gender: user.gender
                };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: "12hr" },
                    async (err, token) => {
                        if(err){
                            res.status(400).send({ok:false, message: err.message})
                        }else{
                            res.status(200).send({ok:true, token: token})
                        }
                    }
                )  
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

export const register = async (req, res) => {
    try {
        let params = req.body
        const user = await User.findOne({ email: params.email })
        if(user){
            res.status(401).send({message:"User Already Exist"})
        }else{
            const hashedPassword = await bcrypt.hash(params.password, 10);
            const dbUser = new User({
                firstName: params.firstName,
                lastName: params.lastName,
                email: params.email,
                password: hashedPassword,
                role: params.role,
            });
            try {
                const data = await dbUser.save();
                res.status(200).send({data})
            } catch (error) {
                res.status(400).send({message:error.message})
            }
                   }
    } catch (error) {
        console.log(error)
        res.status(400).send({ok:false,message: "Invalid Data or Email Already Taken"})
    }
}

