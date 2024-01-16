import { response } from "../../config/response"
import { status } from "../../config/response.status"
import { getUser } from "../providers/test.provider";

export const imageTestController = (req, res, next) => {

    console.log("file", req.file);
    console.log("file-location", req.file.location);

    res.send(response(status.SUCCESS));
}

export const dbTestController = async (req, res, next) => {

    res.send(response(status.SUCCESS, await getUser()));
}