import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import { prisma } from "../../../lib/prisma";
import multer from 'multer';
import AWS from 'aws-sdk';
import { v4 as uuid } from "uuid";

const fileName = uuid()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    signatureVersion: 'v4'
})

const videoStorage = multer.memoryStorage();

const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 52428800 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|wmv|mov)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(null, true)
   }
})

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
.use(videoUpload.single('video'))
.post(async (req, res) => {
  console.log(req.body)
  
  const author = {
    connect: {
      name: req.body.name
    }
  }

  const user = await prisma.user.findUnique({
    where:{
      name: req.body.name
    }
  })

  if(req.body.title.length === 0){
    res.status(500).json({ error: `Title can't be empty` });
  }

  if(user){
    if(req.file){
      const getExt = req.file.originalname.split(".");
      const ext = getExt[getExt.length - 1]
      
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${fileName}.${ext}`,
        Body: req.file.buffer,
        region: "ca-central-1"
      }
  
      const file = await s3.upload(params).promise()
      
      if(file){
        const result = await prisma.post.create({
          data: {
            title: req.body.title,
            video: params.Key,
            game: 'Valorant',
            author: author
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
.delete(async (req, res) =>{

})


export const config = {
  api: {
      bodyParser: false,
  },
}

export default apiRoute;