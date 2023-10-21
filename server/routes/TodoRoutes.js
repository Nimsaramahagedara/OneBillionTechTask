import express from 'express'
import { changeStatus, createItem, deleteItem, getAllItem, getItem, updateItem } from '../controllers/TodoController.js';
import { authMiddleware } from '../middlewares/authUser.js';

const TodoRouter = express.Router();

TodoRouter.use(authMiddleware)
TodoRouter.get('/', getAllItem);
TodoRouter.get('/:_id', getItem);
TodoRouter.post('/', createItem);
TodoRouter.put('/:_id', updateItem);
TodoRouter.put('/status/:_id', changeStatus);
TodoRouter.delete('/:_id', deleteItem);


export default TodoRouter;