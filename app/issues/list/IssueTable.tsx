import IssueBadge from '@/app/components/IssueBadge';
import Link from '@/app/components/Link';
import { Status, Issue } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import React from 'react';

interface Props {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    sortBy?: string;
  };
  issues: Issue[];
}

const tableColumns = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = tableColumns.map((columnName) => columnName.value);

const IssueTable = (props: Props) => {
  const { issues, searchParams } = props;
  const { orderBy, sortBy } = searchParams;
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {tableColumns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className || ''}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sortBy: sortBy
                      ? sortBy === 'asc'
                        ? 'desc'
                        : 'asc'
                      : 'asc',
                  },
                }}
              >
                {column.label}
                {orderBy === column.value &&
                  sortBy &&
                  (sortBy === 'asc' ? (
                    <ArrowDownIcon className='inline' />
                  ) : (
                    <ArrowUpIcon className='inline' />
                  ))}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className='block md:hidden'>
                <IssueBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>
              <IssueBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className='hidden md:table-cell'>
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
