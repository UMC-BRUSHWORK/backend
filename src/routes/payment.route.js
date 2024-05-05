import express from 'express';
import { confirmPaymentController } from '../controllers/payment.controller';

export const paymentRouter = express.Router();

paymentRouter.get('/confirm', confirmPaymentController);