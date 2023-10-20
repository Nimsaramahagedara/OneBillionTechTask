import mongoose from "mongoose";

const TodoItemSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    status:{
        type:Boolean,
        required: true,
        default:false
    }
},{timestamps: true});

const TodoModel = mongoose.model('Todo',TodoItemSchema);
export default TodoModel;