import IssueBadge from '@/app/components/IssueBadge';
import { Issue } from '@prisma/client';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import MarkDown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading as='h1'>{issue.title}</Heading>
      <Flex my='2' gap='2' align='center'>
        <IssueBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt='4'>
        <MarkDown className=''>{issue.description}</MarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
