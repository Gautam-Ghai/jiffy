import { prisma } from "../../lib/prisma";

const isUsernameAvailable = async(username: string) =>{

    let user = null;

    const lowercaseUser = await prisma.userProfile.findUnique({
        where:{
            lowercaseUsername: username.toLowerCase(),
        }
    })

    if(lowercaseUser){
        user = await prisma.userProfile.findUnique({
            where:{
                username: username,
            }
        })
    }

    if(!lowercaseUser && !user) return true
    else return false
}

export default isUsernameAvailable