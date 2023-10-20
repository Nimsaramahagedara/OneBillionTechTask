import express from 'express';
import { loginUser, passwordResetRequest, registerUser, resetPassoword } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/login',loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/reset', passwordResetRequest);
userRouter.post('/updatepassword', resetPassoword);

export default userRouter;