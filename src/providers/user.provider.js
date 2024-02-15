import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
<<<<<<< HEAD

import { getUserHistoryResponseDTO, getUserInfoResponseDTO, getUserLikeListResponseDTO } from "../dtos/user.dto";
import { getUserHistoryToDB, getUserInfoDao, getUserLikeListToDB } from "../models/user.dao";
=======
import { getUserInfoResponseDTO, getUserLikeListResponseDTO, getUserHistoryResponseDTO, getUserHistoryOneResponseDTO, getUserRecentListResponseDTO } from "../dtos/user.dto";
import { getUserInfoDao, getUserLikeListToDB, getUserHistoryToDB, getUserRecentToDB } from "../models/user.dao";

>>>>>>> origin/feature/85

export const getUserLikeList = async (userId, query) => {

    const {paging = 3, cursorId = -1} = query;

    return getUserLikeListResponseDTO(await getUserLikeListToDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}

<<<<<<< HEAD
=======
export const getUserRecent = async (userId, query) => {
    const {paging = 3, cursorId = -1} = query;

    return getUserRecentListResponseDTO(await getUserRecentToDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}

>>>>>>> origin/feature/85
export const getUserHistory = async (userId, query) => {
    const {paging = 3, cursorId = -1, type } = query;   // type: 판매 내역인지, 구매 내역인지 구분을 위함
    
    const result = await getUserHistoryToDB(parseInt(userId), parseInt(cursorId), parseInt(paging), parseInt(type));

    return getUserHistoryResponseDTO(result, type);
}

<<<<<<< HEAD
=======
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

>>>>>>> origin/feature/85
export const getUserInfoProvider = async (userId) => {

    const result = await getUserInfoDao(parseInt(userId));

    if(!result){ throw new BaseError(status.MEMBER_NOT_FOUND); }

    return getUserInfoResponseDTO(result);
}