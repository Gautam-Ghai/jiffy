import { prisma } from "../../../lib/prisma";

export const getAllComments = async(postId: number) => {
    const result =  await prisma.comment.findMany({
        select: {
            content: true,
            createdAt: true,
            authorId: true,
            author:{
                select:{
                    username: true,
                    profileImage: true,
                    user:{
                        select:{
                            image: true
                        }
                    }
                }
            }
        },
        where: {
            postId: postId
        },
        orderBy:{
            createdAt: 'desc'
        },
        take: 10
    })

    return result;
}