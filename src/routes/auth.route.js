import express from 'express';
import asyncHandler from 'express-async-handler';

import { loginController, logoutController, findEmailConrtroller, changepasswordController } from '../controllers/auth.controller';
import { register } from '../controllers/register.controller';
import { resign } from '../controllers/resign.controller';

export const authRouter = express.Router();

authRouter.post('/login', asyncHandler(loginController));
authRouter.post('/logout', asyncHandler(logoutController));
authRouter.post('/register', register);
authRouter.patch('/resign', resign);
authRouter.post('/finduser/email', asyncHandler(findEmailConrtroller));
authRouter.post('/finduser/password', asyncHandler(changepasswordController));