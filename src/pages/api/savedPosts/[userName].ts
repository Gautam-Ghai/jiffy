import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';

//Queries
import { getSavedPostsFromUser } from "@/queries/Post";

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

  const { username } = req.query;

  const posts = await getSavedPostsFromUser(username);

  const result= JSON.stringify(posts)

  res.send({data: result})
})

export default apiRoute;