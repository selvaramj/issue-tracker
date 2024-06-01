"use client";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  searchParams: { pageSize?: string };
  pagesSizes: string[];
}

const PageSizeDropdown = ({ pagesSizes, searchParams }: Props) => {
  const router = useRouter();
  const onChangeHandler = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", value);
    router.push("/issues/list?" + params.toString());
  };
  return (
    <Select.Root
      defaultValue={searchParams.pageSize}
      onValueChange={onChangeHandler}
    >
      <Select.Trigger placeholder="Page size: 5" />
      <Select.Content>
        {pagesSizes.map((pageSize) => (
          <Select.Item key={pageSize} value={pageSize}>
            {pageSize}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PageSizeDropdown;
