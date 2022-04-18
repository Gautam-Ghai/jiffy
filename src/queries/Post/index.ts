import { prisma } from "../../../lib/prisma";

export const getAllPosts = async() => {
    var result = await prisma.post.findMany({
        include: {
          author: {
            select: {
              username: true,
              profileImage: true,
              user:{
                  select:{
                      image: true
                  }
              }
            }
          },
          game:{
            select:{
              id: true,
              name: true,
              logoImage: true
            }
          },
          likedBy:{
            select: {
              username: true
            }
          },
          savedBy:{
            select: {
              username: true
            }
          },
          _count: {
            select:{
              likedBy: true,
              comments: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
    });

    return result;
}

export const getSpecificPost = async(postId: number) => {
    const result = await prisma.post.findUnique({
        include: {
            author: {
                include: {
                    _count: {
                        select: {
                            posts: true
                        }
                    }
                }
            },
            game:{
                select:{
                    id: true,
                    name: true,
                    logoImage: true
                }
            },
            likedBy:{
                select: {
                    username: true
                }
            },
            savedBy:{
                select: {
                    username: true
                }
            },
            _count: {
                select:{
                    likedBy: true,
                    comments: true
                }
            }
        },
        where:{
            id: postId
        }
    });

    return result
}