import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import { prisma } from "../../../lib/prisma";
import AWS from 'aws-sdk';

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
.delete(async( req, res ) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    signatureVersion: 'v4'
})

  const { postId } = req.query;
  const id = parseInt(postId);


  const file = await prisma.post.findUnique({
    where: {
      id: id
    }
  })

  if(file){
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: file.video
    }

    s3.deleteObject(params, (err, data) => {
      if(err) res.status(500).send({Error: "couldn't delete the post"});
    })

    const result = await prisma.post.delete({
      where: {
        id: id
      }
    })

    if(result) res.status(200).send(result)
    else res.status(500).send({Error: "couldn't delete the post"})
  }
  else res.status(500).send({Error: "couldn't delete the post"})
})

export default apiRoute;