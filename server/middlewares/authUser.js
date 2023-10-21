import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";


export const authMiddleware = async (req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        try{
           if(token){
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            //console.log(decoded);
            const foundUser = await UserModel.findById(decoded?.id);
            req.body.createdBy = decoded.id;
            next();
           }
        }catch(err){
            res.status(500).json({error: "Authorized token expired. Please login again."})
        }
    }else{
        res.status(500).json({error: "There is no token attached to header Please Login Again"})
    }
};