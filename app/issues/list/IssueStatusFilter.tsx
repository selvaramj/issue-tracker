"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const IssueStatusFilter = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  let params = { ...(searchParams || {}) };
  const statuses: { label: string; value?: Status }[] = [
    { label: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const onFilterChangeHandler = async (status: string) => {
    const issueListPage = "/issues/list?";
    if (status !== "All") params = { ...params, status };
    if (status === "All") delete params.status;
    params = new URLSearchParams(params).toString();
    router.push(issueListPage + params);
  };
  return (
    <Select.Root
      onValueChange={onFilterChangeHandler}
      defaultValue={searchParams?.status}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
