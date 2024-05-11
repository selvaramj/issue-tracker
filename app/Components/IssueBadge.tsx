import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const issues: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Done", color: "green" },
};

const IssueBadge = ({ status }: { status: Status }) => {
  return <Badge color={issues[status].color}>{issues[status].label}</Badge>;
};

export default IssueBadge;
