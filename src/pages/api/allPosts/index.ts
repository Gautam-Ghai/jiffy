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
    const posts = await prisma.post.findMany({
        include: {
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
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
  
  const result= JSON.stringify(posts)

  res.send({data: result})
})

export default apiRoute;