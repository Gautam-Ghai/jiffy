import { prisma } from "../../../../lib/prisma";
import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';
import { v4 as uuid } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import { getUserId } from "@/queries/User";

const fileName = uuid()

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
.post(async (req, res) => {

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm({maxFileSize: 15728640});

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  
  console.log('fields', data?.fields)
  
  const author = {
    connect: {
      username: data?.fields?.name
    }
  }

  const game = {
    connect: {
      name: data?.fields?.game
    }
  }

  const user = await getUserId(data?.fields?.name);

  if(user){
      
      if(data?.fields?.title.length === 0){
        res.status(500).json({ error: `Title can't be empty` });
      }
    
      const file = data?.files?.video.filepath;

    if(file){
      const response = await cloudinary.v2.uploader.upload(file, {
        resource_type: 'video',
        public_id: `${fileName}`,
        upload_preset: 'whoops-clips'
      });
      
      if(response){
        const result = await prisma.post.create({
          data: {
            title: data?.fields?.title,
            description: data?.fields?.description || null,
            url: response.url,
            publicId: response.public_id,
            author: author,
            game: game
          }
        })

        res.send(result)

      }else {
        res.status(500).json({ error: `Couldn't upload the video!` });
      }
    } else{
        res.status(500).json({ error: `Couldn't find the video!` });
    }
  } else {
    res.status(401).json({ error: `You don't have the access to upload a post` });
  }
})


export const config = {
  api: {
      bodyParser: false,
  },
}

export default apiRoute;