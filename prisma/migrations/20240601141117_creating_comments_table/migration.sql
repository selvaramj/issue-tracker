-- CreateTable
CREATE TABLE "Comments" (
    "id" STRING NOT NULL,
    "description" STRING(350) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedIssueId" STRING NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);
