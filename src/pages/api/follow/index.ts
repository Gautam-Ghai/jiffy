import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect';
import { IncomingForm } from 'formidable';

//Utils
import { prisma } from "../../../../lib/prisma";
import { getUserId } from "@/queries/User";

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

    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

    data?.fields?.userWhoFollowed
    data?.fields?.userToFollow

    const result = await prisma.follows.create({
        data:{
            follower: {
                connect:{
                    username: data?.fields?.userWhoFollowed
                }
            },
            following:{
                connect:{
                    username: data?.fields?.userToFollow
                }
            }
        }
    })

    if(result){
        console.log(result)
        res.send(result)
    }
})
.put(async( req, res ) => {
    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

    data?.fields?.userWhoFollowed
    data?.fields?.userToFollow

    const userWhoFollowed = await getUserId(data?.fields?.userWhoFollowed)
    const userToFollow = await getUserId(data?.fields?.userToFollow)

    const result = await prisma.follows.delete({
        where:{
            followerId_followingId:{
                followerId: userWhoFollowed?.id,
                followingId: userToFollow?.id
            }
        }
    })

    if(result){
        console.log(result)
        res.send(result)
    }
})

export default apiRoute;