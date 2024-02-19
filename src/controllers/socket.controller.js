import { connectRoomService, readMessageService, sendMessageService } from "../services/socket.service";


export const connectRoom = async (info, socket, io) => {
    // 채팅방 접속을 위한 컨트롤러
    socket.join(info.roomId);
    console.log(info);
    console.log(typeof(info.roomId));
    io.to(info.roomId).emit('connect-info', {result: await connectRoomService(info.roomId)})
}

export const sendMessageController = async (message, socket, io) => {
    // 메시지 전달을 위한 컨트롤러

    const { roomId } = message;
    const result = await sendMessageService(message);

    console.log(result);

    if (result) io.to(roomId.toString()).emit('received-message', {result: result});
}

export const readMessageController = async (info, socket, io) => {
    // 메시지 읽었을 때 (채팅방 열람 시간 갱신)를 위한 컨트롤러
    
    const { userId } = info;
    const result = await readMessageService(info);

    if (result) io.to(userId.toString()).emit('read-message', {result: result});
}