import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = ({ searchParams }: { searchParams: object }) => {
  return (
    <Flex className="mb-5" justify="between">
      <IssueStatusFilter searchParams={searchParams} />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
