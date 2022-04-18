import { prisma } from "../../lib/prisma";

const isUsernameAvailable = async(username: string) =>{
    const user = await prisma.userProfile.findUnique({
        where:{
            username: username,
        }
    })

    if(user) return false
    else return true
}

export default isUsernameAvailable