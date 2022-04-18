import { prisma } from "../../../lib/prisma";

export const getUserProfile = async(username: string) => {
    const result = await prisma.userProfile.findUnique({
        where: {
          username: username,
        },
        include: {
          user:{
            select:{
              image: true
            }
          },
          _count: {
            select: {
              posts: true
            }
          }
        }
    })

    return result
}