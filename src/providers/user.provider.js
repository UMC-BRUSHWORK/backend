import { getUserLikeListResponseDTO } from "../dtos/user.dto";
import { getUserLikeListToDB } from "../models/user.dao";

export const getUserLikeList = async (userId, query) => {

    const {paging = 3, cursorId = -1} = query;

    console.log("provider", userId, cursorId, paging);

    return getUserLikeListResponseDTO(await getUserLikeListToDB(parseInt(userId), parseInt(cursorId), parseInt(paging)));
}