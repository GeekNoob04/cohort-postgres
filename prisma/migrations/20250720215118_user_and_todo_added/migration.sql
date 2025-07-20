/*
  Warnings:

  - You are about to drop the column `desciption` on the `Todos` table. All the data in the column will be lost.
  - Changed the type of `userId` on the `Todos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "desciption",
ADD COLUMN     "description" TEXT,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL;
