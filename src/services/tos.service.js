import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

import { compareData } from '../middleware/tos.data';

import { registerTosResponseDTO, editTosResponseDTO } from "../dtos/tos.dto"
import { addTos, getTos, changeTos, getTosByTosId } from "../models/tos.dao";

// 약관 등록
export const joinTos = async (body) => {
    const createdAt = new Date(body.createYear, body.createMonth, body.createDay, body.createTime);
    
    const joinTosData = await addTos({
        'utId': body.utId,
        'utTosId': body.utTosId,
        'utUserId': body.utUserId,
        'utAgree': body.utAgree,
        'createdAt': createdAt        
    });

    // tosId 중복 불가
    if(utTosId == -1){
        throw new BaseError(status.TOS_NOT_EXIST);
    }else{
        return registerTosResponseDTO(
            await getTos(joinTosData)
        );
    }
}

// 약관 동의
export const rejoinTos = async (body) => {
    const updatedAt = new Date(body.updateYear, body.updateMonth, body.updateDay, body.updateTime);
    
    // 약관 존재 확인
    const tos_db = await getTosByTosId(tosId);

    // tosId 중복 불가
    if(utTosId == -1){
        throw new BaseError(status.TOS_NOT_EXIST);
    }else{

        if (tos_db.length > 0) {
            // 기존 데이터
            const existedTosData = await getTos(joinTosData);
    
            // 수정된 데이터
            const rejoinTosData = await changeTos({
                'utId': body.utId,
                'utTosId': body.utTosId,
                'utUserId': body.utUserId,
                'utAgree': body.utAgree,
                'updatedAt': updatedAt        
            });
    
            // 기존 데이터와의 일치(수정 여부) 확인
            const isDataMatch = await compareData(existedTosData, rejoinTosData);
    
            // 데이터 일치 확인
            if (isDataMatch) {
                return editTosResponseDTO(
                        await getTos(rejoinTosData)
                );
            }
        }

    }
}