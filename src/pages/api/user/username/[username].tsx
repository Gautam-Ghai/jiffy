import isUsernameAvailable from "@/utils/isUsernameAvailabe";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {

    let username = req.query.username;

    if(Array.isArray(username)) username = username[0]

    username.replace(/ /g, '')

    try {
        const result = await isUsernameAvailable(username);

        res.status(200).json(
            {
                isUsernameAvailable: result 
            }
        );
    } catch (error) {
        res.status(501).send(error);
    }
    res.end();
}