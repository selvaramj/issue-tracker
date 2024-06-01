import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export const GET = async (request: NextRequest) => {
  console.log("comment", request.url);
  const url = new URL(request.url);
  const issueId = url.searchParams.get("issueId");
  if (!issueId)
    return NextResponse.json(
      { error: "issueId not specified" },
      { status: 400 }
    );
  const comments = await prisma.comment.findMany({
    where: { issueId },
    include: { commentedUser: true },
  });
  return NextResponse.json(comments);
};

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json("UnAuthorized access denied", { status: 401 });
  let newComment;
  try {
    const body = await request.json();
    const { issueId, description } = body;
    newComment = await prisma.comment.create({
      data: { issueId, description },
    });
  } catch (error: Error | any) {
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
  return NextResponse.json(newComment, { status: 201 });
};
