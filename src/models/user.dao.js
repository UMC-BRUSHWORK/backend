// db 연결
import { pool } from "../../config/db.connect";

// 응답 관련
import { BaseError } from "../../config/error";
import { status } from "../../config/response.status";

// sql
import { countUserLike, selectUserLikeList } from "./user.sql";


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

export const addOrChangeUserLikeToDB = async () => {
    try{
        const conn = await pool.getConnection();
        
        // 사용자가 찜 한 작품이 존재하는지 여부 확인

            // 없으면 insert 통해 작품 추가

            // 있으면 Status 변경을 통해 관심 상태 변경 (1 - 관심, 0 - 관심 해제)

        conn.release();
        return "db";

    }catch (err) {
        console.error(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}