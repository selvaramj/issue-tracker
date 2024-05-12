'use client';
import Spinner from '@/app/components/Spinner';
import ErrorMessage from '@/app/components/ErrorMessage';
import { issueCreateSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueCreateSchema>;
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueCreateSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const buttonLabel = issue ? 'Update issue' : 'Submit new issue';

  const onSubmitHandler = handleSubmit(async (data: IssueFormData) => {
    try {
      setLoading(true);
      let response;
      if (issue) response = await axios.patch(`/api/issues/${issue.id}`, data);
      else response = await axios.post<IssueFormData>('/api/issues', data);
      if (response.status) {
        router.push('/issues/list');
        router.refresh();
      }
    } catch (error) {
      console.log('The Error ', error);
    } finally {
      setLoading(false);
    }
  });
  return (
    <div className='max-w-xl'>
      <form onSubmit={onSubmitHandler} className='space-y-2'>
        <TextField.Root
          placeholder='Title'
          {...register('title')}
          defaultValue={issue?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description of the bug' {...field} />
          )}
          control={control}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button type='submit' disabled={loading}>
          {buttonLabel} {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
