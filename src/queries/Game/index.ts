import { prisma } from "../../../lib/prisma";

export const checkGame = async(gamename: string) => {
  const result = await prisma.game.findFirst({
    select:{
      id: true
    },
    where: {
      OR:[
        {
          name: {
            contains: gamename,
            
          }
        },
        {
          name: {
            endsWith: gamename,
          }
        },
        {
          name: {
            equals: gamename,
          }
        },
        {
          name: {
            startsWith: gamename,
          }
        }
      ],
      isApproved: true
    }
  })

  return result;
}

export const getGames = async() => {
    const result = await prisma.game.findMany({
        select: {
          id: true,
          name: true,
          logoImage: true
        },
        where:{
          isApproved: true
        },
        orderBy:{
          id: 'asc'
        },
        take: 10
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
        },
    })

    return result;
}

export const getAllGames = async() => {
  const result = await prisma.game.findMany({
      include: {
          _count: {
              select:{
                  posts: true,
                  userFollows: true,
              }
          }
      },
      orderBy:{
        posts:{
          _count: 'desc'
        }
      },
      take: 10
  })

  return result;
}