import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import multer from 'multer';
import path from "path";
import AWS from 'aws-sdk';
import { v4 as uuid } from "uuid";
import fs from 'fs';

const fileName = uuid()

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    signatureVersion: 'v4'
})

const videoStorage = multer.diskStorage({
    destination : './public/uploads', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, fileName + path.extname(file.originalname))
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 52428800 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
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
.post(async(req, res) => {
    if(req.file){
        const fileStream = fs.createReadStream(req.file.path)
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: req.file.filename,
            Body: fileStream,
            region: "ca-central-1"
        }

        var s3url = s3.getSignedUrl('getObject', {Key: params.Key, Bucket: process.env.AWS_BUCKET, Expires: 600000});

        const result = await s3.upload(params).promise()
        console.log(s3url)
        res.send(result)
    } else{
        res.status(500).json({ error: `Couldn't find the video!` });
    }
})

export const config = {
    api: {
        bodyParser: false,
    },
  }

export default apiRoute;