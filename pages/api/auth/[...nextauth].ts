import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { prisma } from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler;

const options = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        })
    ],

    adapter: PrismaAdapter(prisma)
}