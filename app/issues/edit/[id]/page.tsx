import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/IssueFormSkeleton";

interface Props {
  params: { id: string };
}
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  loading: () => <IssueFormSkeleton />,
});

const fetchIssue = cache(async (issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueEditPage = async ({ params: { id } }: Props) => {
  const issue = await fetchIssue(+id);
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};

export default IssueEditPage;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(+params.id);
  if (!issue) {
    notFound();
  }
  return {
    title: issue?.title,
    description: issue?.description,
  };
}
