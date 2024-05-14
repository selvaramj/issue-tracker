import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueBadge from "./components/IssueBadge";

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
      <Heading as="h4">Latest issues</Heading>
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
                  <Flex direction="column" align="end">
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser?.image || "/avatar.png"}
                        fallback="?"
                        radius="full"
                        loading="lazy"
                        title={`currently assigned to ${issue.assignedToUser.name}`}
                      />
                    )}
                    <Text>{issue.assignedToUser?.email}</Text>
                  </Flex>
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
