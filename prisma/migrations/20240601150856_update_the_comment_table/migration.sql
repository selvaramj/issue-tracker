/*
  Warnings:

  - You are about to drop the column `assignedIssueId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `issueId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "assignedIssueId";
ALTER TABLE "Comment" ADD COLUMN     "commentedUserId" STRING(255);
ALTER TABLE "Comment" ADD COLUMN     "issueId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentedUserId_fkey" FOREIGN KEY ("commentedUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
