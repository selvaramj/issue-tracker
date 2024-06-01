import prisma from "@/prisma/client";
import { Box, Grid, Flex } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import Assignee from "./Assignee";
import { cache } from "react";
import Comments from "../_components/Comments";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const page = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(+id);

  if (!issue) notFound();
  return (
    <>
      <Grid columns={{ sm: "1", md: "5" }} gap="5">
        <Box className="lg:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction="column" gap="4" className="max-w-fit">
              <Assignee issue={issue} />
              <EditButton issueId={issue.id} />
              <DeleteButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
      <Grid columns={{ sm: "1", md: "2" }} gap="5">
        <Comments issueId={issue.id + ""} />
      </Grid>
    </>
  );
};

export default page;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(+params.id);
  return {
    title: issue?.title,
    description: issue?.description,
  };
}
