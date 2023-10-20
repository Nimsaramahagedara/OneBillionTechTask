// models/token.model.js
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    token: {
        type: String,
        required: true,
    },
}, { timestamps: true, expires: 3600 });

tokenSchema.pre("save", async function (next) {
    if (!this.isModified('token')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.token = await bcrypt.hash(this.token, salt);
})

//Password compare method
tokenSchema.methods.isTokenMatched = async function(enteredToken){
    return await bcrypt.compare(enteredToken,this.token);
}

const TokenModel = mongoose.model("Token", tokenSchema);
export default TokenModel;