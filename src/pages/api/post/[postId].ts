import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import nc from 'next-connect';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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

  const { postId } = req.query;
  const id = parseInt(postId);


  const file = await prisma.post.findUnique({
    where: {
      id: id
    }
  })

  if(file){
    const del = await cloudinary.v2.uploader.destroy(file.publicId,  {type : 'upload', resource_type : 'video'})

    var result = null;
    if(del.result === 'ok'){
      result = await prisma.post.delete({
        where: {
          id: id
        }
      })
    }

    if(result && del.result === 'ok') res.status(200).send(result)
    else res.status(500).send({Error: "couldn't delete the post"})
  }
  else res.status(500).send({Error: "couldn't delete the post"})
})

export default apiRoute;