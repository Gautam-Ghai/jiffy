import { prisma } from "../lib/prisma";

export const main = async () => {
    const newGame = await prisma.game.create({
      data: {
        name: 'Valorant'
      }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);