import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const main = async () => {
    const newPost = await prisma.post.create({
        data:{
            username: "tenz",
            game: "Valorant",
            video: "/assets/video.mp4",
            comments: 50,
            views: 130,
            likes: 97,
            shares: 43
        }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);