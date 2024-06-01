"use client";
import { Issue, User } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Skeleton from "@/app/components/SkeletonLoader";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Assignee = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const { data: users, isLoading, isError } = useUsers();

  if (isError) return null;

  const onChangeHandler = (payload: object, field: string) => {
    field === "status" ? setIsStatusUpdating(true) : setIsSubmitting(true);

    axios
      .patch(`/api/issues/${issue.id}`, { ...payload })
      .then(() => {
        toast.success("Changed saved.", { position: "top-center" });
      })
      .catch(() => {
        toast.error("Chanaged could not be saved", {
          position: "top-center",
        });
      })
      .finally(() => {
        field === "status"
          ? setIsStatusUpdating(false)
          : setIsSubmitting(false);
        router.refresh();
      });
  };
  return (
    <Flex direction="column" gap="2">
      {isLoading ? (
        <Skeleton height="2rem" />
      ) : (
        <Select.Root
          onValueChange={(userId) =>
            onChangeHandler(
              {
                assignedToUserId: userId === "unassignee" ? null : userId,
                status: userId === "unassignee" ? "OPEN" : "IN_PROGRESS",
              },
              "assignee"
            )
          }
          disabled={isSubmitting}
          defaultValue={
            issue.assignedToUserId ? issue.assignedToUserId : undefined
          }
          value={issue.assignedToUserId ? issue.assignedToUserId : undefined}
        >
          <Select.Trigger placeholder="Assign to" />
          <Select.Content prefix={isSubmitting ? "assigning..." : ""}>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              {issue.assignedToUserId && (
                <Select.Item value="unassignee">Unassign</Select.Item>
              )}
              {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status) => onChangeHandler({ status }, "status")}
        disabled={isStatusUpdating}
        value={issue.status}
      >
        <Select.Trigger placeholder="Status" />
        <Select.Content>
          <Select.Item value="OPEN">Open</Select.Item>
          <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
          <Select.Item value="CLOSED">Closed</Select.Item>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </Flex>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
  });

export default Assignee;
