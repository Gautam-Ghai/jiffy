/*
  Warnings:

  - You are about to drop the column `coverVideo` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "coverVideo";

-- CreateTable
CREATE TABLE "_userFollowGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userFollowGame_AB_unique" ON "_userFollowGame"("A", "B");

-- CreateIndex
CREATE INDEX "_userFollowGame_B_index" ON "_userFollowGame"("B");

-- AddForeignKey
ALTER TABLE "_userFollowGame" ADD FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userFollowGame" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
