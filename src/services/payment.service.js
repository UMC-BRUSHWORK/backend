import { paymentConfirmResponseDTO } from "../dtos/payment.dto";

export const confirmPayment = async (paymentInfo = {}) => {
  const { paymentKey, orderId, amount } = paymentInfo;

  const encryptedSecretKey = 'Basic ' + Buffer.from(process.env.TOSS_PAY_SECRET_KEY + ':').toString('base64');

  // 결제 승인 API 호출
  const response = await fetch(
    'https://api.tosspayments.com/v1/payments/confirm',
    {
      method: 'POST',
      body: JSON.stringify({ orderId, amount, paymentKey }),
      headers: {
        Authorization: encryptedSecretKey,
        'Content-Type': 'application/json',
      },
    },
  );

  const data = await response.json();

  return await paymentConfirmResponseDTO(data);
}