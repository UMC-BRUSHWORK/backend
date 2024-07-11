import moment from 'moment-timezone';

export const paymentConfirmResponseDTO = async (data) => {

  if(data.method == "간편결제"){
    return {
      "paymentKey": data.paymentKey,
      "orderId": data.orderId,
      "orderName": data.orderName,
      "orderStatus": data.status,
      "paymentMethod": data.method,
      "easyPayProvider": data.easyPay.provider,
      "pay": data.totalAmount,
      "date": moment.utc(data.approvedAt).tz("Asia/Seoul").add(9, 'h').format('YYYY/MM/DD HH:mm:ss'),
    };  
  }

  // 카드
  return {
    "paymentKey": data.paymentKey,
    "orderId": data.orderId,
    "orderName": data.orderName,
    "orderStatus": data.status,
    "paymentMethod": data.card.cardType + data.method,
    "planMonth": data.card.installmentPlanMonths == 0 ? '일시불' : data.card.installmentPlanMonths + "개월",
    "cardBank": CARD_BANK[data.card.acquirerCode],
    "pay": data.card.totalAmount,
    "date": moment.utc(data.approvedAt).tz("Asia/Seoul").add(9, 'h').format('YYYY/MM/DD HH:mm:ss'),
  };
  
}

const CARD_BANK = {
  "3K": "기업비씨",
  "46": "광주",
  "71": "롯데",
  "30": "산업",
  "31": "비씨",
  "51": "삼성",
  "38": "새마을",
  "41": "신한",
  "62": "신협",
  "36": "씨티",
  "33": "우리",
  "W1": "우리",
  "37": "우체국",
  "39": "저축",
  "35": "전북",
  "42": "제주",
  "15": "카카오뱅크",
  "3A": "케이뱅크",
  "24": "토스뱅크",
  "21": "하나",
  "61": "현대",
  "11": "국민",
  "91": "농협",
  "34": "수협",
  "6D": "다이너스",
  "4M": "마스터카드",
  "3C": "유니온페이",
  "7A": "아메리칸 익스프레스",
  "4J": "JCB",
  "4V": "VISA",
}