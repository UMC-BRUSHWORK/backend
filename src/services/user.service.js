import { addOrChangeUserLikeResponseDTO } from "../dtos/user.dto";
import { addOrChangeUserLikeToDB, getUserLikeToDB } from "../models/user.dao";

export const addOrChangeUserLikeCon = async (userId, body) => {

    const { productId } = body;

    const indexId = await addOrChangeUserLikeToDB(parseInt(userId), parseInt(productId));

    return addOrChangeUserLikeResponseDTO(await getUserLikeToDB(indexId));
}