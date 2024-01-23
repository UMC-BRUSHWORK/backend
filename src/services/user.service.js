import { addOrChangeUserLikeResponseDTO } from "../dtos/user.dto";
import { addOrChangeUserLikeToDB, getUserLikeToDB } from "../models/user.dao";

export const addOrChangeUserLikeCon = async (userId, query) => {

    const { productId = -1 } = query;

    const indexId = await addOrChangeUserLikeToDB(parseInt(userId), parseInt(productId));

    return addOrChangeUserLikeResponseDTO(await getUserLikeToDB(indexId));
}