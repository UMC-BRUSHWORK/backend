import { pool } from "../../config/db.connect";
import { getSql } from "./login.sql";

export const getUserByEmail = async (email) => {
    const values = [email];
    console.log('inget');

    try {
        const [result] = await pool.query(getSql, values);
        console.log('inpool', null, result);
        return result;
    } catch (err) {
        console.error('inpool', err, null);
        throw err; // You may choose to handle the error in a different way based on your requirements.
    }
};