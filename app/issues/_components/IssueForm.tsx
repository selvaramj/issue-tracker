"use client";
import Spinner from "@/app/components/Spinner";
import ErrorMessage from "@/app/components/ErrorMessage";
import { issueCreateSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { Button, Flex, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueCreateSchema>;
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueCreateSchema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const buttonLabel = issue ? "Update issue" : "Submit new issue";

  const onSubmitHandler = handleSubmit(async (data: IssueFormData) => {
    try {
      setLoading(true);
      let response;
      if (issue) response = await axios.patch(`/api/issues/${issue.id}`, data);
      else response = await axios.post<IssueFormData>("/api/issues", data);
      if (response) {
        router.push("/issues/list");
        router.refresh();
      }
    } catch (error) {
      console.log("The Error ", error);
    } finally {
      setLoading(false);
    }
  });
  return (
    <div className="max-w-2xl">
      <form onSubmit={onSubmitHandler} className="space-y-2">
        <Flex gap="5" wrap="wrap">
          <Flex direction="column" gap="5">
            <Flex direction="column" gap="2">
              <label htmlFor="title">Title</label>
              <TextField.Root
                placeholder="Title"
                {...register("title")}
                defaultValue={issue?.title}
                id="title"
              />
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </Flex>
            <Flex direction="column" gap="2">
              <label htmlFor="description">Description</label>
              <Controller
                name="description"
                defaultValue={issue?.description}
                render={({ field }) => (
                  <SimpleMDE placeholder="Description of the bug" {...field} />
                )}
                control={control}
              />
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </Flex>
          </Flex>
          <Flex direction="column" align="start" gap="5">
            <Flex direction="column" gap="2">
              <label htmlFor="status">Status</label>
              <select
                {...register("status")}
                name="status"
                defaultValue={issue?.status || "OPEN"}
                className="border-2 px-0.5 py-1 rounded-md"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
              </select>
              <ErrorMessage>{errors.status?.message}</ErrorMessage>
            </Flex>
            <Button type="submit" disabled={loading} className="bg-green-700">
              {buttonLabel} {loading && <Spinner />}
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};

export default IssueForm;
