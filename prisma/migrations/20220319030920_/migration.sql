/*
  Warnings:

  - You are about to drop the column `image` on the `Game` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('First_Person_Shooter', 'Third_Person_Shooter', 'Sandbox', 'Real_Time_Strategy', 'Multiplayer_Online_Battle_Arena', 'Role_Playing', 'Simulation', 'Sports', 'Puzzle', 'Survival', 'Horror', 'Action', 'Adventture');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "image",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "coverVideo" TEXT,
ADD COLUMN     "genre" "Genre" NOT NULL DEFAULT E'Action',
ADD COLUMN     "logoImage" TEXT,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "releaseDate" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bannerImageId" TEXT;

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
