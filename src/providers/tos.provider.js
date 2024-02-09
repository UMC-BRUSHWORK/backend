import { getTos, getTosUserListDao } from "../models/tos.dao";
import { getTosListResponseDTO, getTosUserListResponseDTO } from "../dtos/tos.dto";

export const getTosListProvider = async () => {
    return getTosListResponseDTO(await getTos());
}

export const getTosUserListProvider = async (userId) => {

    return getTosUserListResponseDTO(await getTosUserListDao(parseInt(userId)));
}