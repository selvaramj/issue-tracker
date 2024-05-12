import { Flex, Grid } from '@radix-ui/themes';
import Pagination from './components/Pagination';
import prisma from '@/prisma/client';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

interface Props {
  searchParams: { page?: string };
}
export default async function Dashboard({ searchParams }: Props) {
  const opened = await prisma.issue.count({ where: { status: 'OPEN' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary closed={closed} inProgress={inProgress} open={opened} />
        <IssueChart closed={closed} inProgress={inProgress} open={opened} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View summary of issues.',
};
