'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '@/app/components/Spinner';

const DeleteButton = ({ issueId }: { issueId: number }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const onClickHandler = async (issueId: number) => {
    try {
      setLoading(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setError(true);
      console.log('Delete issue api error ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={loading}>
            <span className='text-base'>&#128465;</span> Delete issue{' '}
            {loading && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone
          </AlertDialog.Description>
          <Flex justify='between' mt='4'>
            <AlertDialog.Cancel>
              <Button color='gray' variant='soft'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={() => onClickHandler(issueId)}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Something went wrong. Please try agin later
          </AlertDialog.Description>
          <Button
            variant='soft'
            color='gray'
            onClick={() => setError(false)}
            className='mt-4'
          >
            Ok
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
