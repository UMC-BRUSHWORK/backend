import { dbTestResponseDTO } from "../dtos/test.dto";
import { getUserDB } from "../models/test.dao";

export const getUser = async () => {

    return dbTestResponseDTO(await getUserDB());
}