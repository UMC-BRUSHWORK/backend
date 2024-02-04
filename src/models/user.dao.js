// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { countUserLike, findUserLikeCount, getUserLikeToIndexId, insertUserLike, selectUserLikeList, updateProductLikeCount, updateUserLike } from "./user.sql";


export const getUserLikeListToDB = async (userId, cursorId, paging) => {
    try{
        const conn = await pool.getConnection();
        
        if(cursorId == -1){
            const [temp] = await pool.query(countUserLike);
            cursorId = temp[0].likeCount + 1;
        }
        // 사용자 관심 작품 - 사용자 아이디, 커서 아이디, paging 사이즈
        const [prefer_list] = await pool.query(selectUserLikeList, [userId, cursorId, paging]);

        conn.release();
        return prefer_list;

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addOrChangeUserLikeToDB = async (userId, productId) => {
    try{
        const conn = await pool.getConnection();
        let favorCount = 0;
        
        // 사용자가 찜 한 작품이 존재하는지 여부 확인
        const [existence] = await pool.query(findUserLikeCount, [userId, productId]);
        if(!existence[0].favorExist){
            // 없으면 insert 통해 작품 추가
            const [insertLike] = await pool.query(insertUserLike, [userId, productId]);
            
            conn.release();
            return insertLike.insertId;
        }else{
            // 있으면 Status 변경을 통해 관심 상태 변경 (1 - 관심, 0 - 관심 해제)
            if(existence[0].favor_status){
                favorCount = -1;
            }else{
                favorCount = 1
            }
            const [updateLike] = await pool.query(updateUserLike, [!existence[0].favor_status, existence[0].fv_id]);
            await pool.query(updateProductLikeCount, [productId, productId]);
            
            conn.release();
            return existence[0].fv_id;
        }
    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getUserLikeToDB = async (indexId) => {
    try{
        const conn = await pool.getConnection();
        
        const [userLike] = await pool.query(getUserLikeToIndexId, indexId);

        conn.release();
        return userLike[0];

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}