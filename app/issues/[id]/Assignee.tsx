'use client';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Skeleton from '@/app/components/SkeletonLoader';
import toast, { Toaster } from 'react-hot-toast';

const Assignee = ({ issue }: { issue: Issue }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const { data: users, isLoading, isError } = useUsers();

  if (isLoading) return <Skeleton height='2rem' />;
  if (isError) return null;

  const assigneeChangesHandler = (userId: string) => {
    setIsAssigning(true);
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === 'unassignee' ? null : userId,
      })
      .then(() => {
        toast.success('Changed saved.', { position: 'top-center' });
      })
      .catch(() => {
        toast.error('Chanaged could not be saved', {
          position: 'top-center',
        });
      })
      .finally(() => setIsAssigning(false));
  };
  return (
    <>
      <Select.Root
        onValueChange={assigneeChangesHandler}
        disabled={isAssigning}
        defaultValue={issue.assignedToUserId || ''}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content prefix={isAssigning ? 'assigning...' : ''}>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {issue.assignedToUserId && (
              <Select.Item value='unassignee'>Unassigned</Select.Item>
            )}
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
  });

export default Assignee;
