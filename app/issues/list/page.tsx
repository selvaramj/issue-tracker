import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    sortBy?: "asc" | "desc";
    page?: string;
    pageSize?: string;
    assignee?: string;
  };
}
const availableStatuses = Object.keys(Status);

const Issues = async ({ searchParams }: Props) => {
  let { status, orderBy, sortBy, page, pageSize, assignee } = searchParams;
  const page_size = pageSize ? +pageSize : 5;
  const finalizedStatus = availableStatuses.includes(status || "")
    ? status
    : undefined;
  const where = { status: finalizedStatus, assignedToUserId: assignee };
  orderBy = orderBy && columnNames.includes(orderBy) ? orderBy : undefined;
  const issues: Issue[] = await prisma.issue.findMany({
    where,
    orderBy: orderBy
      ? { [orderBy]: sortBy ? (sortBy === "asc" ? "asc" : "desc") : "asc" }
      : undefined,
    skip: (parseInt(page || "1") - 1) * page_size,
    take: page_size,
  });
  const pageCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions searchParams={searchParams} />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={parseInt(page || "1")}
        itemCount={pageCount}
        pageSize={page_size}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default Issues;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all the list of issues.",
};
