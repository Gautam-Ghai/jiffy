-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('like', 'comment', 'gameRequestCreated', 'gameRequestApproved', 'gameRequestDeclined', 'follow');

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "recipientId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
