import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TodoItemSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'users'  
    },
    status:{
        type:Boolean,
        required: true,
        default:false
    }
},{timestamps: true});

const TodoModel = mongoose.model('Todo',TodoItemSchema);
export default TodoModel;