import moment from 'moment-timezone';

export const createRoomResponseDTO = (data, status) => {

    return {
        "roomId": data.cr_id,
        "isAlreadyExist": status
    }
}

export const getChatResponseDTO = (data) => {

    const chatList = [];

    for (let i = 0; i < data.length; i++) {
        chatList.push({
            "roomId": data[i].cr_id,
            "roomStatus": data[i].cr_status,
            "buyerId": data[i].cr_buyer_id,
            "buyerNickname": data[i].buyerName,
            "buyerProfile": data[i].buyerProfile,
            "sellerId": data[i].cr_seller_id,
            "sellerNickname": data[i].sellerName,
            "sellerProfile": data[i].sellerProfile,
            "latestMsg": data[i].cr_latest_msg,
            "latestMsgDate": moment.utc(data[i].cr_latest_msg_date).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
            "notReadCount": (data[i].notReadCount ? data[i].notReadCount : 0)
        });
    }
    
    return {
        "chatListData": chatList,
        "cursorId": data[data.length-1].cr_id
    };
}

export const getChatLogResponseDTO = (data) => {

    const chatLogList = [];

    for (let item of data) {
        chatLogList.push({
            "messageId": item.cm_id,
            "senderId": item.cm_sender_id,
            "receiverId": item.cm_receiver_id,
            "message": item.cm_content,
            "isRead": item.cm_is_read,
            "date": moment.utc(item.created_at).tz("Asia/Seoul").add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
            "isMedia": item.cm_is_media
        });
    }
    
    return {
        "chatLogListData": chatLogList,
        "cursorId": (data.length > 0) ? data[data.length-1].cm_id : -1
    };
}