import { pool } from "../../config/db.connect";
import { updateUserStatus } from "./resign.sql";
import { status } from "../../config/response.status";

export const changeStatusByEmail = async(email) =>{
    try{
        const conn = await pool.getConnection();

        const result = await pool.query(updateUserStatus, email);

        conn.release();
        return result;
    } catch (err){
        onn.release();
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}