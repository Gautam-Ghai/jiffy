import { prisma } from "../../../lib/prisma";

export const getGames = async() => {
    const result = await prisma.game.findMany({
        select: {
          id: true,
          name: true,
          logoImage: true
        },
        orderBy:{
          id: 'asc'
        }
    })

    return result;
}

export const getGame = async(gamename: string) => {
    const result = await prisma.game.findUnique({
        include: {
            _count: {
                select:{
                    posts: true
                }
            },
            posts:{
                include:
                {
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
                take: 10
            }
        },
        where: {
            name: gamename
        }
    })

    return result;
}