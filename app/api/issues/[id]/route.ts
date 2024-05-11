import { authOptions } from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json("UnAuthorized access denied", { status: 401 });
  const body = await request.json();
  // validating the body
  if (!body || (body && !Object.keys(body).length))
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  const { title, description, assignedToUserId } = body;
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  // if assignedToUserId is present means, we need to check the valida user id or not
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json(
        { error: "Invalid assignedToUserId" },
        { status: 400 }
      );
  }
  const issue = await prisma.issue.findUnique({ where: { id: +id } });
  if (!issue)
    return NextResponse.json({ message: "Invalid issue id" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: +id },
    data: { title, description, assignedToUserId },
  });
  return NextResponse.json(updatedIssue);
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json("UnAuthorized access denied", { status: 401 });
  const issue = await prisma.issue.findUnique({ where: { id: +id } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  await prisma.issue.delete({ where: { id: +id } });
  return NextResponse.json({ status: "success" });
};
