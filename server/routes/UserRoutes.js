import express from 'express';
import { getUser, loginUser, passwordResetRequest, registerUser, resetPassoword } from '../controllers/UserController.js';
import { authMiddleware } from '../middlewares/authUser.js';
//import { authMiddleware } from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.get('/user',authMiddleware, getUser);
userRouter.post('/login',loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/reset', passwordResetRequest);
userRouter.put('/', resetPassoword);

export default userRouter;