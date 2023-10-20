import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//SINCE THIS ONLY AN ASSIGNMENT I DIDNT ADD MORE FIELDS TO THE MODEL
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
},{timestamps: true});

//Encrypt the password before saving the document
userSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//Password compare method
userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const UserModel = mongoose.model('users',userSchema);
export default UserModel;