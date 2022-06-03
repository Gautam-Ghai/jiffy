/*
  Warnings:

  - You are about to drop the `_userFollowGame` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[lowercaseUsername]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_userFollowGame" DROP CONSTRAINT "_userFollowGame_A_fkey";

-- DropForeignKey
ALTER TABLE "_userFollowGame" DROP CONSTRAINT "_userFollowGame_B_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "addedById" INTEGER,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "lowercaseUsername" TEXT;

-- DropTable
DROP TABLE "_userFollowGame";

-- CreateTable
CREATE TABLE "GameRquests" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "GameRquests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollowGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GameRquests_gameId_key" ON "GameRquests"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollowGame_AB_unique" ON "_UserFollowGame"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollowGame_B_index" ON "_UserFollowGame"("B");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_lowercaseUsername_key" ON "UserProfile"("lowercaseUsername");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRquests" ADD CONSTRAINT "GameRquests_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRquests" ADD CONSTRAINT "GameRquests_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowGame" ADD CONSTRAINT "_UserFollowGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollowGame" ADD CONSTRAINT "_UserFollowGame_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
