import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { getUserHistoryResponseDTO, getUserInfoResponseDTO, getUserLikeListResponseDTO } from "../dtos/user.dto";
import { getUserHistoryToDB, getUserInfoDao, getUserLikeListToDB } from "../models/user.dao";

export const getUserLikeList = async (userId, query) => {

    const {paging = 3, cursorId = -1} = query;

    return getUserLikeListResponseDTO(await getUserLikeListToDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}

export const getUserHistory = async (userId, query) => {
    const {paging = 3, cursorId = -1, type } = query;   // type: 판매 내역인지, 구매 내역인지 구분을 위함
    
    const result = await getUserHistoryToDB(parseInt(userId), parseInt(cursorId), parseInt(paging), parseInt(type));

    return getUserHistoryResponseDTO(result, type);
}

export const getUserInfoProvider = async (userId) => {

    const result = await getUserInfoDao(parseInt(userId));

    if(!result){ throw new BaseError(status.MEMBER_NOT_FOUND); }

    return getUserInfoResponseDTO(result);
}