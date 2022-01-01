import { prisma } from "../lib/prisma";

export const main = async () => {
    const newPost = await prisma.post.update({
      where: {
        id: 1
      },
      data: {
        title: 'abccd'
      }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);