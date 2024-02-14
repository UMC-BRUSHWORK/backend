import { addTos, changeTos } from '../models/tos.dao'
import { editTosResponseDTO, registerTosResponseDTO } from "../dtos/tos.dto";

// 약관 등록
export const joinTos = async (body) => {
    
    const joinTosData = await addTos({
        'tosId': body.tosId,
        'userId': body.userId,
        'agree': body.utAgree,
    });

    return registerTosResponseDTO(joinTosData);
}

// 약관 동의
export const rejoinTos = async (utId, body) => {
    const {agree} = body;
    // 수정된 데이터
    const rejoinTosData = await changeTos(parseInt(utId), agree);

    return editTosResponseDTO(rejoinTosData);
}
