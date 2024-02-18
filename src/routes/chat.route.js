import express from "express";
import asyncHandler from "express-async-handler";

import { createChatRoomController, getChatController, getChatLogController, getProductChatListController } from "../controllers/chat.controller";
import { connectRoom, readMessageController, sendMessageController } from "../controllers/socket.controller";

// 채팅 정보 관련 연결 
export const chatRouter = (io) => {
    const router = express.Router();
    // 채팅방 생성
    router.post('/create-room', asyncHandler(createChatRoomController));
    // 채팅방 리스트 가져오기
    router.post('/list', asyncHandler(getChatController));
    // 채팅방 채팅 로그 요청(이전까지 채팅했던 내역 요청)
    router.post('/chat-log', asyncHandler(getChatLogController));

    // 특정 product 채팅방 리스트 가져오기 (거래 완료 시 사용)
    router.get('/product-list/:authorId', asyncHandler(getProductChatListController));

    io.on("connection", (socket) => {
        // 소켓 연결 (join) -> 채팅방 세부 정보 전달
        socket.on('connect-room', (info) => asyncHandler(connectRoom(info, socket, io)));
        // 메시지 전송 시 실행
        socket.on('send-message', (message) => asyncHandler(sendMessageController(message, socket, io)));
        // 메시지 읽었을 때 (채팅방 열람 시간 갱신)
        socket.on('read-message', (info) => asyncHandler(readMessageController(info, socket, io)));
    });

    return router;
}
