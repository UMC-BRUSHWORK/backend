import express from 'express';
import { confirmPaymentController, printPaymentController } from '../controllers/payment.controller';

export const paymentRouter = express.Router();

paymentRouter.post('/confirm', confirmPaymentController);
paymentRouter.get('/', printPaymentController)