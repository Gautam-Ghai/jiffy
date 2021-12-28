import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import { prisma } from "../../../lib/prisma";
import { User } from "../../../src/utils/types/user";

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
.post(async (req, res) => {

    const author = {
      connect: {
        id: req.body.authorId
      }
    }

    if(author) {
      const result = await prisma.post.create({
        data: {
          video: '/assets/video.mp4',
          game: 'Valorant',
          author: author
        }
      })
    console.log(result)
    res.send(result)
    }
})

export default apiRoute;