import express from 'express';
import asyncHandler from 'express-async-handler';
import { loginController, logoutController } from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/login', asyncHandler(loginController));
authRouter.post('/logout', asyncHandler(logoutController));