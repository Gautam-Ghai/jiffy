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
        },
        take: 10
    });

    return result;
}

export const getSpecificPost = async(postId: number) => {
    const result = await prisma.post.findUnique({
        include: {
            author: {
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
                    comments: true,
                    savedBy: true
                }
            }
        },
        where:{
            id: postId
        }
    });

    return result
}

export const getAllPostsFromUser = async(username: string) => {
    const result = await prisma.userProfile.findUnique({
      select:{
        posts:{
          include: {
            author: {
              select: {
                username: true,
                profileImage: true,
                user: {
                  select: {
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
                comments: true,
                savedBy: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        },
      },
      where:{
        username: username
      },
    });

    return result;
}

export const getLikedPostsFromUser = async(username: string) => {
  const result = await prisma.userProfile.findUnique({
    select:{
      likedPosts:{
        select:{
          id: true,
          createdAt: true,
          updatedAt: true,
          title: true,
          description: true,
          url: true,
          publicId: true,
          gameId: true,
          views: true,
          authorId: true,
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
              comments: true,
              savedBy: true
            }
          },
        },
        orderBy:{
          createdAt: 'desc'
        },
        take: 10
      }
    },
    where:{
      username: username
    }
  })

  return result;
}

export const getSavedPostsFromUser = async(username: string) => {
  const result = await prisma.userProfile.findUnique({
    select:{
      savedPosts:{
        select:{
          id: true,
          createdAt: true,
          updatedAt: true,
          title: true,
          description: true,
          url: true,
          publicId: true,
          gameId: true,
          views: true,
          authorId: true,
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
              comments: true,
              savedBy: true
            }
          },
        },
        orderBy:{
          createdAt: 'desc'
        },
        take: 10
      }
    },
    where:{
      username: username
    }
  })

  return result;
}

export const getPostsFromFollowing = async() =>{
  const users = [{
    username: 'text'
  },
  {
    username: 'text'
  }
]
    
  const query =  users.map((user) =>{
    const test = {
      author:{
        username: user.username
      }
    }

    return test;
  })

  const result = prisma.post.findMany({
    where:{
      OR : query
    }
  })
} 