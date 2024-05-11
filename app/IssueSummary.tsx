"use client";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const router = useRouter();
  const container: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "In-progress issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="2">
      {container.map((container) => (
        <Card
          key={container.label}
          className="hover:cursor-pointer hover:drop-shadow-md"
          onClick={() => router.push(`/issues/list?status=${container.status}`)}
        >
          <Flex direction="column" justify="center" align="center">
            <Text className="text-sm font-medium">{container.label}</Text>
            <Text className="font-bold">{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
