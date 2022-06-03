import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import TwitchProvider from "next-auth/providers/twitch";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { prisma } from "../../../../lib/prisma";
import randomUsername from "@/utils/randomUsername";
import isUsernameAvailable from "@/utils/isUsernameAvailabe";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler;

const options = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET
          })
    ],
    adapter: PrismaAdapter(prisma),
    session: { jwt: true },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            const userProfile = await getOrCreateUserProfile(user.name, user.id)
            if(user){
                token.user = user
                token.userProfile = userProfile
            }
            return token
          },
        async session({ session, token, user }) {
            const userProfile = await getOrCreateUserProfile(user.name, user.id)
            session = {
                ...session,
                user: {
                    id: user.id,
                    name: userProfile?.username,
                    email: user.email,
                    image: user.image,
                    profileImage: userProfile?.profileImage
                }
            }
            console.log(session)
            return session
          }
      }
}

const getOrCreateUserProfile = async(name: string, id: number) =>{
    try{
        const user = await prisma.userProfile.findUnique({
            where:{
                userId: id
            }
        })
    
        if(!user){
            if(name){
                const nameAvailable = await isUsernameAvailable(name);
                if(nameAvailable){
                    const userProfile = await prisma.userProfile.create({
                        data:{
                            user: {
                                connect: {
                                    id: id
                                }
                            },
                            username: name.replace(/ /g, ''),
                            lowercaseUsername: name.toLowerCase().replace(/ /g, '')
                        }
                    })
                    return userProfile
                }else {
                    const username = await randomUsername();
                    const userProfile = await prisma.userProfile.create({
                        data:{
                            user: {
                                connect: {
                                    id: id
                                }
                            },
                            username: username,
                            lowercaseUsername: username.toLowerCase()
                        }
                    })
                    return userProfile
                }
            } else {
                const username = await randomUsername();
                const userProfile = await prisma.userProfile.create({
                    data:{
                        user: {
                            connect: {
                                id: id
                            }
                        },
                        username: username
                    }
                })
                return userProfile
            }
        } else {
            return user
        }
    } catch(err){
        console.log(err)
    }   
}