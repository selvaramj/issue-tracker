"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { itemCount, pageSize, currentPage } = props;
  const pageCount = Math.ceil(itemCount / pageSize);

  const changePageHandler = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    console.log("LOG ", params, page);

    router.push("?" + params);
  };
  if (!pageCount)
    return <p className="m-2 text-center">Currently no data found.</p>;
  return (
    <Flex align="center" gap="2" mt="3" justify="center">
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePageHandler(1)}
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePageHandler(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePageHandler(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePageHandler(pageCount)}
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
