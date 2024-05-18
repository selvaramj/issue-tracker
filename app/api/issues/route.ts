import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { issueCreateSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json("UnAuthorized access denied", { status: 401 });
  try {
    const body = await req.json();
    const { title, description, status } = body;
    const validationResult = issueCreateSchema.safeParse(body);
    if (!validationResult.success)
      return NextResponse.json(validationResult.error.errors, { status: 400 });
    const newIssue = await prisma.issue.create({
      data: { title, description, status },
    });
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error: Error | any) {
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues);
  } catch (error: Error | any) {
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
};
