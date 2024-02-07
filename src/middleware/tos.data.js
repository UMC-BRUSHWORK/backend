import { BaseError } from '../../config/error';
import { status } from '../../config/response.status';

export const compareData = async (existedData, editedData) => {
    try {
        console.log("existed", existedData);
        console.log("edited", editedData);

        return await compare(existedData, editedData);
    } catch (error) {
        console.error('Error comparing datas:', error);
        throw new BaseError(status.TOS_NOT_CHANGE);
    }
};
