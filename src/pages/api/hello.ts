import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from 'next-connect';
import multer from 'multer';

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '')
  }
})

const upload  = multer({storage}).single('video')

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },

  // Handle any other HTTP method
  onNoMatch: (req, res, next) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
.use(upload)
.post('/upload', (req, res) => {
  console.log(req.file)
  res.send({
    message:"Hello World"
  })
})

export default apiRoute;