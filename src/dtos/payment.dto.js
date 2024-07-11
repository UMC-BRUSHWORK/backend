import moment from 'moment-timezone';

export const paymentConfirmResponseDTO = async (data) => {

  return {
      "paymentKey": data.paymentKey,
      "orderId": data.orderId,
      "orderName": data.orderName,
      "orderStatus": data.status,
      "paymentMethod": data.method,
      "date": moment.utc(data.approvedAt).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
  };
}