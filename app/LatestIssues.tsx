import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueBadge } from "./Components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  console.log("Issues,  ", issues);

  return (
    <Card>
      <Heading as="h4" align="center">
        Latest issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="hover:underline"
                    >
                      {issue.title}
                    </Link>
                    <IssueBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      radius="full"
                      loading="lazy"
                      title={`currently assigned to ${issue.assignedToUser.name}`}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
