import express from 'express'
import { createItem, deleteItem, getAllItem, getItem, updateItem } from '../controllers/TodoController.js';

const TodoRouter = express.Router();

TodoRouter.get('/', getAllItem);
TodoRouter.get('/:_id', getItem);
TodoRouter.post('/', createItem);
TodoRouter.put('/:_id', updateItem);
TodoRouter.delete('/:_id', deleteItem);


export default TodoRouter;