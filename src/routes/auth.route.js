import express from 'express';
import asyncHandler from 'express-async-handler';

import { register } from '../controllers/register.controller';
import { loginController, logoutController } from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/login', asyncHandler(loginController));
authRouter.post('/logout', asyncHandler(logoutController));
authRouter.post('/register', register);

