/*
  Warnings:

  - You are about to drop the column `video` on the `Post` table. All the data in the column will be lost.
  - Made the column `url` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publicId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "video",
ALTER COLUMN "url" SET NOT NULL,
ALTER COLUMN "publicId" SET NOT NULL;
