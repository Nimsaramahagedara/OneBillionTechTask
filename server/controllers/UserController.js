import UserModel from "../models/UserModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import { isValid } from "../utils/validator.js";

export const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    })
    return token
}

export const registerUser = async (req, res) => {
    const data = req.body;

    try {
        //CHECK FOR VALIDATIONS
        const error = isValid(data.email, data.password);
        if (error) {
            throw Error(error)
        }

        const isExsist = await UserModel.findOne({ email: data.email });
        if (isExsist) {
            throw Error('Account Already Exist !')
        } else {
            const result = await UserModel.create(data);
            if (result) {
                res.status(200).json({ message: 'Registration Successfull' })
            }
        }

    } catch (error) {
        //console.log(error);
        res.status(401).json(error.message)
    }

}

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
        res.status(200).json({ message: 'Login Success', token })
    } catch (error) {
        //console.log(error);
        res.status(401).json(error.message);
    }
}
