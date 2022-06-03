import { prisma } from "../../../lib/prisma";

export const getUserId = async(username: string) => {
  const result = await prisma.userProfile.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true
      }
  })

  return result
}

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
          socialMedia:{
            select:{
              discord: true,
              facebook: true,
              instagram: true,
              tiktok: true,
              twitch: true,
              twitter: true,
            }
          },
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true,
            }
          }
        }
    })

    return result
}

export const getRecomendedUsers = async(username?: string) => {
  const result = await prisma.userProfile.findMany({
    select:{
      id: true,
      userId: true,
      createdAt: true,
      profileImage: true,
      username: true,
      user: {
        select:{
          image: true,
        }
      }
    },
    take: 6,
    orderBy:{
      createdAt: 'desc'
    },
    where:{
      NOT:{
        username: username || undefined
      }
    }
  })

  return result;
}