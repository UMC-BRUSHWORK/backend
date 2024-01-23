import express from 'express';
import { login } from '../controllers/login.controller';
import { loginpage } from '../controllers/login.controller';
import { logout } from '../controllers/logout.controller';
import { logoutpage } from '../controllers/logout.controller';
export const authRouter = express.Router();

authRouter.get('/login', loginpage);
authRouter.post('/login', login);
authRouter.get('/logout', logoutpage);
authRouter.post('/logout', logout);