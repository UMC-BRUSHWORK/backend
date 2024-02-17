import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { addOrChangeUserLikeResponseDTO, updateUserInfoResponseDTO } from "../dtos/user.dto";
import { addOrChangeUserLikeToDB, getUserByUserId, getUserLikeToDB, updateUserInfoDao } from "../models/user.dao";

export const addOrChangeUserLikeCon = async (userId, query) => {

    const { productId = -1 } = query;

    const indexId = await addOrChangeUserLikeToDB(parseInt(userId), parseInt(productId));

    const data = await getUserLikeToDB(indexId);

    return addOrChangeUserLikeResponseDTO(data);
    // return addOrChangeUserLikeResponseDTO(await getUserLikeToDB(indexId));
}

export const updateUserInfoService = async (userId, body, file) => {

    const {userNickname, userIntroduce} = body;

    // 수정 이전 데이터, active 상태일 때만 수정 가능
    const befInfo = await getUserByUserId(parseInt(userId));

    if(!befInfo) { throw new BaseError(status.MEMBER_NOT_FOUND_OR_INACTIVE) }

    const updateInfo = {
        "userId": befInfo.user_id,
        "nickname": userNickname ? userNickname : befInfo.user_nickname,
        "introduce": userIntroduce ? userIntroduce : (befInfo.user_introduce ? befInfo.user_introduce : null),
        "profile": file ? file.location: befInfo.user_profile,
    }

    return updateUserInfoResponseDTO(await updateUserInfoDao(updateInfo));
}