/*
  Warnings:

  - Made the column `lowercaseUsername` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "lowercaseUsername" SET NOT NULL;
