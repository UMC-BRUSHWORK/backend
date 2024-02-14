import { getUserLikeListResponseDTO, getUserHistoryResponseDTO, getUserHistoryOneResponseDTO } from "../dtos/user.dto";
import { getUserLikeListToDB, getUserHistoryToDB } from "../models/user.dao";
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { getUserInfoResponseDTO, getUserLikeListResponseDTO } from "../dtos/user.dto";
import { getUserInfoDao, getUserLikeListToDB } from "../models/user.dao";

export const getUserLikeList = async (userId, query) => {

    const {paging = 3, cursorId = -1} = query;

    return getUserLikeListResponseDTO(await getUserLikeListToDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}

export const getUserHistory = async (userId, query) => {
    const {paging = 3, cursorId = -1, type } = query;   // type: 판매 내역인지, 구매 내역인지 구분을 위함
    
    console.log("provider", userId, cursorId, paging);
    const result = await getUserHistoryToDB(parseInt(userId), parseInt(cursorId), parseInt(paging), parseInt(cursorId), parseInt(paging));

    const consume = result[0]
    const auth = result[1]

    if(auth == "")
    {
        return getUserHistoryOneResponseDTO(consume, 1);
    }
    if(consume == "")
    {
        return getUserHistoryOneResponseDTO(auth, 2);
    }

    //판매내역인지 구매내역인지 구분 필요..

    console.log("consume :  " + consume);
    console.log("auth :  " + auth);

    return getUserHistoryResponseDTO(consume, auth);
}

export const getUserInfoProvider = async (userId) => {

    const result = await getUserInfoDao(parseInt(userId));

    if(!result){ throw new BaseError(status.MEMBER_NOT_FOUND); }

    return getUserInfoResponseDTO(result);
}