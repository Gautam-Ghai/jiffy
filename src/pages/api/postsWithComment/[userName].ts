import { Post } from "@/utils/types/post";
import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import { prisma } from "../../../../lib/prisma";

const apiRoute = nc<NextApiRequest, NextApiResponse>({

    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
      },
    
      // Handle any other HTTP method
      onNoMatch: (req, res, next) => {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
      },
  
})
.get( async(req, res) => {

  const { userName } = req.query;

  const user = await prisma.user.findUnique({
      select:{
          id: true
      },
      where: {
          name: userName
      }
  })

  const id = user?.id

  if(id){
      
    const posts = await prisma.comment.findMany({
        select:{
            content: true,
            authorId: true,
            createdAt: true,
            author: {
                select:{
                    name: true,
                    image: true,
                    profileImage: true,
                }
            },
            postId: true,
            post:{
                select:{
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    title: true,
                    description: true,
                    url: true,
                    publicId: true,
                    gameId: true,
                    authorId: true,
                    author: {
                        select: {
                        name: true,
                        image: true,
                        profileImage: true,
                        }
                    },
                    game:{
                        select:{
                        name: true,
                        image: true
                        }
                    },
                    likedBy:{
                        select: {
                        name: true
                        }
                    },
                    savedBy:{
                        select: {
                        name: true
                        }
                    },
                    _count: {
                        select:{
                        likedBy: true,
                        comments: true
                        }
                    },
                }
            }
        },
        where:{
            authorId: id
        }
    })

    let newArr: any[] = []

    if(posts){
        posts.forEach((post) => {
            let demoObj = {
                id: 0,
                createdAt: '',
                updatedAt: '',
                title: '',
                description: '',
                url: '',
                publicId: '',
                gameId: 0,
                authorId: 0,
                author:{
                    name: '',
                    image: '',
                    profileImage: ''
                },
                game: {
                    name: '',
                    image: ''
                },
                likedBy: [],
                savedBy: [],
                _count: {
                    likedBy: 0,
                    comments: 0
                },
                comment: {
                    content: '',
                    authorId: 0,
                    createdAt: '',
                    author: {
                        name: '',
                        image: '',
                        profileImage: '',
                    },
                    postId: 0
                }
            }

            demoObj.id = post.post.id
            demoObj.createdAt = post.post.createdAt,
            demoObj.updatedAt = post.post.updatedAt,
            demoObj.title = post.post.title,
            demoObj.description = post.post.description,
            demoObj.url = post.post.url,
            demoObj.publicId = post.post.publicId,
            demoObj.gameId = post.post.gameId,
            demoObj.authorId = post.post.authorId,
            demoObj.author.name = post.post.author.name,
            demoObj.author.image = post.post.author.image,
            demoObj.author.profileImage = post.post.author.profileImage,
            demoObj.game.name = post.post.game.name,
            demoObj.game.image = post.post.game.image,
            demoObj.likedBy = post.post.likedBy,
            demoObj.savedBy = post.post.savedBy,
            demoObj._count.likedBy = post.post._count.likedBy,
            demoObj._count.comments = post.post._count.comments,
            demoObj.comment.content = post.content,
            demoObj.comment.authorId = post.authorId,
            demoObj.comment.postId = post.postId,
            demoObj.comment.author.name = post.author.name,
            demoObj.comment.author.image = post.author.image,
            demoObj.comment.author.profileImage = post.author.profileImage,
            demoObj.comment.createdAt = post.createdAt

            newArr.push(demoObj)
        })
    }

    const result= JSON.stringify(newArr)

    res.send({data: result})

  } else {
    res.status(500).end("user not found")
  }
})

export default apiRoute;