"use client";
import { Comment } from "@prisma/client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface Props {
  issueId: string;
}
const Comments = ({ issueId }: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const { status, data: sessionData } = useSession();
  const { data: comments } = useComments(issueId, {
    enabled: status === "authenticated",
  });

  if (status === "unauthenticated") return null;

  const onSubmitHandler = async () => {
    if (!ref.current) return;
    try {
      setLoading(true);
      const description = ref.current.value as string;
      const result = await axios.post(`/api/comments`, {
        description,
        issueId,
      });
      ref.current.value = "";
      router.refresh();
    } catch (error) {
      console.log("The comment error ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="3">
      <Heading as="h2">Comments</Heading>
      {status === "authenticated" && (
        <Flex direction="column" gap="3" width="550px">
          <TextArea placeholder="Share your thoughts..." ref={ref} />
          <Button onClick={onSubmitHandler} size="2" style={{ width: "180px" }}>
            Add Comment
          </Button>
        </Flex>
      )}
      {comments?.map((comment) => (
        <Card key={comment.id} className="min-w-full">
          <Flex gap="3" align="center">
            <Avatar size="3" src="./avatar.png" radius="full" fallback="T" />
            <Flex direction="column" className="w-full">
              <Flex justify="between">
                <Text as="div" size="2" weight="bold">
                  {sessionData?.user?.name}
                </Text>
                <Text as="div" size="1" className="italic">
                  {new Date(comment.createdAt).toDateString()}
                </Text>
              </Flex>
              <Text as="div" size="2" color="gray">
                {comment.description}
              </Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

const useComments = (issueId: string, config: { enabled: boolean }) =>
  useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      axios
        .get<Comment[]>(`/api/comments?issueId=${issueId}`)
        .then((res) => res.data),
    ...config,
  });

export default Comments;
