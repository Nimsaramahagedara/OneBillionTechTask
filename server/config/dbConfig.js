import mongoose from "mongoose";


export const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            UseNewUrlParser: true
        }).then(()=>{
            console.log('Database Connected !!');
        })
    } catch (error) {
        console.log(error);
    }
}
