import { addOrChangeUserLikeResponseDTO } from "../dtos/user.dto";
import { addOrChangeUserLikeToDB } from "../models/user.dao";

export const addOrChangeUserLikeCon = async () => {



    return addOrChangeUserLikeResponseDTO(await addOrChangeUserLikeToDB());
}