import moment from 'moment-timezone';

export const createRoomResponseDTO = (data, status) => {

    return {
        "roomId": data.cr_id || data,
        "isAlreadyExist": status
    }
}

export const getChatResponseDTO = (data) => {

    const chatList = [];
    let cursorId = -1;

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
            "latestMsgDate": moment.utc(data[i].cr_latest_msg_date).add(9,'h').format('YYYY-MM-DD HH:mm:ss'),
            "notReadCount": (data[i].notReadCount ? data[i].notReadCount : 0)
        });
    }

    if(data.length){
        cursorId = data[data.length-1].cr_id;
    }
    
    return {
        "chatListData": chatList,
        "cursorId": cursorId
    };
}

export const getChatLogResponseDTO = (data, logCount) => {

    const chatLogList = [];
    let cursorId = -1;

    for (let item of data) {
        chatLogList.push({
            "messageId": item.cm_id,
            "senderId": item.cm_sender_id,
            "receiverId": item.cm_receiver_id,
            "message": item.cm_content,
            "isRead": item.cm_is_read,
            "date": moment.utc(item.created_at).add(9, 'h').format('YYYY-MM-DD HH:mm:ss'),
            "isMedia": item.cm_is_media
        });
    }

    if(data.length){
        cursorId = data[data.length-1].cm_id;
    }
    
    return {
        "chatLogListData": chatLogList,
        "cursorId": cursorId,
        "totalChatMsg": logCount
    };
}

export const getProductChatListResponseDTO = (data) => {

    const productChatList =[];
    let cursorId = -1;

    for (let item of data){
        productChatList.push({
            "roomId": item.cr_id,
            "buyerId": item.cr_buyer_id,
            "buyerNickname": item.user_nickname,
            "buyerProfile": item.user_profile,
            "sellerId": item.cr_seller_id,
            "productId": item.cr_product_id,
            "latestMsgDate": moment.utc(item.cr_latest_msg_date).add(9,'h').format('YYYY-MM-DD HH:mm:ss'),
        })
    }

    if(data.length){
        cursorId = data[data.length-1].cr_id;
    }

    return {
        "productChatList": productChatList,
        "cursorId": cursorId
    };
}