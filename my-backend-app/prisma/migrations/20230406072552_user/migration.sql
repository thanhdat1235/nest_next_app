/*
  Warnings:

  - You are about to drop the column `email` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Chat_email_key` ON `Chat`;

-- AlterTable
ALTER TABLE `Chat` DROP COLUMN `email`,
    ADD COLUMN `groupId` VARCHAR(191) NOT NULL,
    ADD COLUMN `receiverId` VARCHAR(191) NOT NULL,
    ADD COLUMN `senderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `groupId` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'member';

-- CreateTable
CREATE TABLE `ChatGroup` (
    `id` VARCHAR(191) NOT NULL,
    `groupName` VARCHAR(191) NOT NULL,
    `groupAvartar` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ChatGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ChatGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
