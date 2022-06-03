import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';

//Utils
import { prisma } from "../../../../lib/prisma";

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
.put(async(req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm({maxFileSize: 15728640});

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const { postId } = req.query;
  const id = parseInt(postId);

  const game = {
    connect: {
      name: data?.fields?.game
    }
  }

  if(data?.fields?.title.length === 0){
    res.status(500).json({ error: `Title can't be empty` });
  }

  const result = await prisma.post.update({
    data:{
      game: game,
      title: data?.fields?.title,
      description: data?.fields?.description
    },
    where: {
      id: id
    }
  })

  res.send(result)

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

    let postResult = null;
    let commentResult = null;
    if(del.result === 'ok'){
      commentResult = await prisma.comment.deleteMany({
        where: {
          postId: id
        }
      })
      if(commentResult){
        postResult = await prisma.post.delete({
          where: {
            id: id
          }
        })
      }
    }
    
    if(postResult && commentResult && del.result === 'ok') res.status(200).send(postResult)
    else res.status(500).send({Error: "couldn't delete the post"})
  }
  else res.status(500).send({Error: "couldn't delete the post"})
})

export const config = {
  api: {
      bodyParser: false,
  },
}

export default apiRoute;