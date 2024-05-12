import { Box, Flex, Card } from '@radix-ui/themes';
import Skeleton from '@/app/components/SkeletonLoader';

const IssueDetailsPageLoader = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex my='2' gap='2' align='center'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='mt-4'>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssueDetailsPageLoader;
