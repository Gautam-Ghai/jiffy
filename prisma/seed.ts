import { prisma } from "../lib/prisma";

export const main = async () => {
    const newPost = await prisma.user.create({
        data:{
          name: 'fishmanjr',
          email: 'gautam.ghai@outlook.com',
          website: 'http://abc.xyz',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo, metus ac porttitor convallis, magna urna molestie est, ut luctus justo arcu nec odio. Maecenas tempor iaculis condimentum. Etiam augue lacus, consequat ac eleifend cursus, aliquet in enim. Nulla est ante, dignissim tincidunt sollicitudin ac, auctor quis libero.',
          postsCount: 34,
          viewsCount: 1100,
          followersCount: 2200,
          followingCount: 78
        }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);