import express from 'express';
import { getUser, loginUser, passwordResetRequest, registerUser, resetPassoword } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/user', getUser);
userRouter.post('/login',loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/reset', passwordResetRequest);
userRouter.put('/', resetPassoword);

export default userRouter;