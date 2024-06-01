/*
  Warnings:

  - You are about to drop the `Comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Comments";

-- CreateTable
CREATE TABLE "Comment" (
    "id" STRING NOT NULL,
    "description" STRING(350) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedIssueId" STRING NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
