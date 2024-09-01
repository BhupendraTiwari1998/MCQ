import UserModel from "../models/user.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// auth 

export const SignUp = async (req, res) => {
    try {
        const { name, email, contact, password } = req.body;
        const existUser = await UserModel.findOne({ email: email });
        if (existUser) {
            return res.status(400).json({
                message: "User already exist"
            })
        }
        const hashedPassword = bcrypt.hashSync(password ,10);
        // console.log(password, hashedPassword)

        const saveUser = await UserModel.create({
            name:name,
            email: email,
            contact: contact,
            password: hashedPassword
        });

        if (saveUser) {
            return res.status(201).json({
                message: "SignUp Success"
            })
        }
        return res.status(400).json({
            message: "Bad Request"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const SignIN = async (req, res)=>{
    try {

        const {email, password} = req.body;
        const existUser = await UserModel.findOne({email: email})
        if(!existUser){
            return res.status(400).json({
                message: "User does't exist"
            })
        }

        const checkPassword = bcrypt.compareSync(password, existUser.password);
        if(!checkPassword){
            return res.status(400).json({
                message:"Invalid Credential"
            })
        }

        const token = jwt.sign(
            {
                _id: existUser._id,
                email: existUser.email
            },
            process.env.TOKEN_SECRET_KEY,
            {expiresIn:"10h"}
        )
        // console.log("tokennnnn", token);

        return res.status(200).json({
            data:existUser,
            token:token,
            message:"Login Success"
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}