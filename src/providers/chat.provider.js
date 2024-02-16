import { getChatLogResponseDTO, getChatResponseDTO } from "../dtos/chat.dto";
import { getChatListDao, getChatLogDao } from "../models/chat.dao";

export const getChatService = async (body, query) => {
    // 채팅방 리스트 가져오기
    const { userId } = body;
    const { paging = 10, cursorId = -1} = query;

    const result = await getChatListDao(userId, parseInt(paging), parseInt(cursorId));

    return getChatResponseDTO(result);
    // return addNewMessageResponseDTO(await addNewMessageDao(roomId, userId, message, not_read));
}

export const getChatLogService = async (body, query) => {

    const { roomId } = body;
    const { paging = 10, cursorId = -1} = query;

    console.log("body", body);
    console.log("query", query);

    const result = await getChatLogDao(roomId, parseInt(paging), parseInt(cursorId));

    console.log("resultData", result);

    return getChatLogResponseDTO(result);
}