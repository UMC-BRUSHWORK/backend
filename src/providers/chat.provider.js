import { getChatLogResponseDTO, getChatResponseDTO, getProductChatListResponseDTO } from "../dtos/chat.dto";
import { getChatListDao, getChatLogDao, getProductChatListDao } from "../models/chat.dao";

export const getChatService = async (body, query) => {
    // 채팅방 리스트 가져오기
    const { userId } = body;
    const { paging = 10, cursorId = -1} = query;

    const result = await getChatListDao(userId, parseInt(paging), parseInt(cursorId));

    return getChatResponseDTO(result);
}

export const getChatLogService = async (body, query) => {

    const { roomId } = body;
    const { paging = 10, cursorId = -1} = query;
    const result = await getChatLogDao(roomId, parseInt(paging), parseInt(cursorId));

    return getChatLogResponseDTO(result);
}

export const getProductChatListProvider = async (authorId, query) => {
    const { productId, paging = 5, cursorId = -1 } = query;

    const result = await getProductChatListDao(parseInt(authorId), parseInt(productId), parseInt(paging), parseInt(cursorId));

    return getProductChatListResponseDTO(result);

}