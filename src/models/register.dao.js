import { pool } from "../../config/db.connect";
import { selectEmailSql } from "./register.sql";
import { selectNicknameSql } from "./register.sql";
import { createUserSql } from "./register.sql";



export const getUserByNickname = async (nickname) => {

  try {
    console.log('1-1');
    const results = await useQuery(selectNicknameSql, [nickname]);
    console.log('1-2');
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
    console.log('1-3');


  try {
    console.log('1-4');

    const results = await useQuery(selectEmailSql, [email]);
    console.log('1-5');

    return results.length > 0 ? results[0] : null;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (req_email, req_password, req_name, req_nickname, req_phone) => {
    console.log('1-6');

    try {
        console.log('1-7');
        const results = await useQuery(createUserSql, [req_name, req_password, req_email, req_nickname, req_phone]);
        console.log('1-8');
        return results;
      } catch (error) {
        throw error;
      }
}

const useQuery = async (sql, values) => {
    try{
        const [result] = await pool.query(sql,values);
        return result;
    } catch(error){
        console.error('Error in useQuery:', error);
        throw error;
    }
};