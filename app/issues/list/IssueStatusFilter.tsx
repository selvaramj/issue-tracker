"use client";
import { Status, User } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import Skeleton from "@/app/components/SkeletonLoader";

const IssueStatusFilter = ({ searchParams }: { searchParams: any }) => {
  const router = useRouter();
  const { data: users, isLoading, isSuccess } = useUser();
  let params = { ...(searchParams || {}) };
  const statuses: { label: string; value?: Status }[] = [
    { label: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const onFilterChangeHandler = (
    value: string,
    param: object,
    field: string
  ) => {
    const issueListPage = "/issues/list?";
    if (value !== "All") params = { ...params, ...param };
    if (value === "All") delete params[field];
    params = new URLSearchParams(params).toString();
    router.push(issueListPage + params);
  };

  return (
    <Flex gap="2">
      <Select.Root
        onValueChange={(value) =>
          onFilterChangeHandler(value, { status: value }, "status")
        }
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
      {isLoading ? (
        <Skeleton height="2rem" />
      ) : (
        <Select.Root
          onValueChange={(id) =>
            onFilterChangeHandler(id, { assignee: id }, "assignee")
          }
          defaultValue={searchParams?.assignee}
        >
          <Select.Trigger placeholder="Filter by assignee" />
          <Select.Content>
            <Select.Item value="All">All</Select.Item>
            {users?.map((status) => (
              <Select.Item key={status.id} value={status.id}>
                {status.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
    </Flex>
  );
};

const useUser = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
  });

export default IssueStatusFilter;
