import { Box, Button, DropdownMenu, Flex, Select } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import PageSizeDropdown from "./PageSizeDropdown";

const IssueActions = ({ searchParams }: { searchParams: object }) => {
  return (
    <Flex className="mb-5" justify="between" gap="2">
      <IssueStatusFilter searchParams={searchParams} />
      <Flex gap="2" className="flex-wrap">
        <PageSizeDropdown
          pagesSizes={["5", "10", "20", "50", "100"]}
          searchParams={searchParams}
        />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default IssueActions;
