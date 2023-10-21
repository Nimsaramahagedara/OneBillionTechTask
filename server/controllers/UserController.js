import validator from "validator";
import jwt from "jsonwebtoken";
import { isValid } from "../utils/validator.js";
import TokenModel from "../models/tokenModel.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmail } from "../utils/sendEmail.js";
import UserModel from "../models/userModel.js";

export const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    })
    return token
}
export const getId = (token) => {
    const id = jwt.verify(token, process.env.SECRET_KEY)
    return id.id
}

//REGISTER USER
export const registerUser = async (req, res) => {
    const data = req.body;

    try {
        //CHECK FOR VALIDATIONS
        const error = isValid(data.email, data.password);
        if (error) {
            throw Error(error)
        }

        const isExist = await UserModel.findOne({ email: data.email });
        if (isExist) {
            throw Error('Account Already Exist !')
        } else {
            const result = await UserModel.create(data);
            if (result) {
                res.status(200).json({ message: 'Registration Successfull' })
            }
        }

    } catch (error) {
        //console.log(error);
        res.status(401).json({message:error.message})
    }

}

//LOGIN USER
export const loginUser = async (req, res) => {
    const { email, password } = req.body;



    try {
        //CHECK FOR VALIDATIONS
        const error = isValid(email, password);
        if (error) {
            throw Error(error);
        }

        const isExist = await UserModel.findOne({ email: email });

        //CHECH IS ACCOUNT IS EXIST OR NOT
        if (!isExist) {
            throw Error('Email Not Exist');
        }

        //CHECK IS PASSWORD IS MATCH
        const isMatched = await isExist.isPasswordMatched(password);

        if (!isMatched) {
            throw Error('Password Not Matched');
        }

        const token = createToken(isExist._id);
        //SEND THE TOKEN
        res.status(200).json({ message: 'Login Success', token, user:isExist })
    } catch (error) {
        //console.log(error);
        res.status(401).json({message:error.message});
    }
}

//GET USER
export const getUser = async (req, res) => {
    const { token } = req.body;
    
    
    try {
        const _id = getId(token);
        const isExist = await UserModel.findById(_id);

        //CHECH IS ACCOUNT IS EXIST OR NOT
        if (!isExist) {
            throw Error('Account Not Exist');
        }

        //SEND THE TOKEN
        res.status(200).json(isExist);
    } catch (error) {
        //console.log(error);
        res.status(401).json({message:error.message});
    }
}


//RESET PASSWORD REQUEST
export const passwordResetRequest = async (req,res)=>{
    const {email} = req.body;
    try {
       const result = await requestResetPassword(email);
       if(result){
        console.log(result);
        res.status(200).json({message: 'Please Check Your Inbox'});
       }
    } catch (error) {
        res.status(401).json({message:error.message});
    }
}


//RESET PASSWORD WITH NEW PASSWORD
export const resetPassoword = async (req,res)=>{
    const {token, id, password} = req.body;
    try {
        const isTokenExist = await TokenModel.findOne({userId: id});
        const isUserExist = await UserModel.findById(id);
        if(isTokenExist && isUserExist){
            const isMatched = await isTokenExist.isTokenMatched(token);
            if(!isMatched){
                throw Error('Token Expired Please Try again');
            }
            isUserExist.password = password;
            const result = await isUserExist.save();
           // const result = await UserModel.findByIdAndUpdate(id,{password: password});

            if(result){
                res.status(200).json({message:'Password Updated Successfully!'});
            }

        }else{
            throw Error('Token not exist in Database');
        }
    } catch (error) {
        res.status(401).json({message: error.message});
    }
}

//GENERATE RESET PASSWORD LINK AND RESET TOKEN
export const requestResetPassword = async (email) => {
   // const { email } = req.body;

        const isExsit = await UserModel.findOne({ email });
        if (!isExsit) {
            throw new Error("Email Not Found");
        }

        const token = await TokenModel.findOne({ userId: isExsit._id });
        if (token) {
            await TokenModel.deleteOne()
        };

        let resetToken = crypto.randomBytes(32).toString("hex");
        // const salt = bcrypt.genSaltSync();
        // const hash =await bcrypt.hash(resetToken,salt);

        const tokenData = {
            userId: isExsit._id,
            token: resetToken
        }
        const result = await TokenModel.create(tokenData);

        const clientURL = process.env.CLIENT_URL;
        const link = `${clientURL}/passwordReset?token=${resetToken}&id=${isExsit._id}`;
        await sendEmail(isExsit.email, "Password Reset Request", { name: isExsit.name, link: link, }, "./template/resetPassword.handlebars");
        return link;

}
