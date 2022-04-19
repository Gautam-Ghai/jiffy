import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

//Utils
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
.post(async( req, res ) => {

  const { postId } = req.query;
  const id = parseInt(postId);

  console.log(req.body.name)
  const user = {
    connect: {
      username: req.body.name
    }
  }

  const result = await prisma.post.update({
    data:{
      likedBy: user
    },
    where:{
      id: id
    }
  })

  if(result){
    console.log(result)
    res.send(result)
  }
    
})
.put(async( req, res ) => {
  const { postId } = req.query;
  const id = parseInt(postId);

  const user = {
    disconnect: {
      username: req.body.name
    }
  }

  const result = await prisma.post.update({
    data: {
      likedBy: user
    },
    where: {
      id: id
    }
  })

  if(result){
    res.send(result)
  }
})

export default apiRoute;