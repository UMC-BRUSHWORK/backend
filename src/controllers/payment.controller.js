import { response } from "../../config/response"
import { status } from "../../config/response.status"

import { confirmPayment } from "../services/payment.service"

export const confirmPaymentController = (req, res, next) => {
  console.log("confirmPayment", req.query);
  return res.send(response(status.SUCCESS, confirmPayment(req.query)))
}

export const printPaymentController = (req, res, next) => {
  return res.send(response(status.SUCCESS, "paymentController"))
}