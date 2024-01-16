import { pool } from "../../config/db.connect";
import { getOneUser } from "./test.sql";

export const getUserDB = async () => {
    try{
        const conn = await pool.getConnection();

        const [rows] = await pool.query(getOneUser);
        conn.release();
        return rows;

    }catch (err) {
        console.error(err);
    }
}