import { connectRoomResponseDTO, readMessageResponseDTO, sendMessageResponseDTO } from "../dtos/socket.dto";
import { addMessageDao, getChatRoomToRIdDao, readMessageDao } from "../models/socket.dao";

export const connectRoomService = async (roomId) => {
    return connectRoomResponseDTO(await getChatRoomToRIdDao(roomId));
}

export const sendMessageService = async (message) => {

    const {roomId, senderId, receiverId, content, isMedia = 0 } = message;

    const result = await addMessageDao(roomId, senderId, receiverId, content, isMedia);

    return sendMessageResponseDTO(result);
}

export const readMessageService = async (info) => {

    const {roomId, userId} = info;

    const result = await readMessageDao(roomId, userId);
    
    return readMessageResponseDTO(result, roomId, userId);
}
