import { Status } from "@prisma/client";
import { z } from "zod";

const statusEnum = z.nativeEnum(Status);
export const userRegistrationSchema = z.object({
  email: z.string().email("Invalid email").max(40),
  password: z
    .string()
    .min(5, "Invalid password, min 5 character required")
    .max(30),
  name: z.string().min(3, "Name is required.").max(255),
});

export const issueCreateSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
  status: z.nativeEnum(Status).optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(500)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
