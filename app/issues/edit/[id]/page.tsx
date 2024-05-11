import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  loading: () => <IssueFormSkeleton />,
});
const IssueEditPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};

export default IssueEditPage;
