import { response } from "../../config/response"
import { status } from "../../config/response.status"

import { confirmPayment } from "../services/payment.service"

export const confirmPaymentController = async (req, res, next) => {
  console.log("confirmPayment", req.body);
  return res.send(response(status.SUCCESS, await confirmPayment(req.body)));
}

export const printPaymentController = (req, res, next) => {
  return res.send(response(status.SUCCESS, "paymentController"))
}