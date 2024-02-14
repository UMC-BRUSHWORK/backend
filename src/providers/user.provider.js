import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";
import { getUserInfoResponseDTO, getUserLikeListResponseDTO } from "../dtos/user.dto";
import { getUserInfoDao, getUserLikeListToDB } from "../models/user.dao";

export const getUserLikeList = async (userId, query) => {

    const {paging = 3, cursorId = -1} = query;

    return getUserLikeListResponseDTO(await getUserLikeListToDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}

export const getUserInfoProvider = async (userId) => {

    const result = await getUserInfoDao(parseInt(userId));

    if(!result){ throw new BaseError(status.MEMBER_NOT_FOUND); }

    return getUserInfoResponseDTO(result);
}