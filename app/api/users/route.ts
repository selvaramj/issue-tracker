import { userRegistrationSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (request: NextRequest) => {
  const users =
    (await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        hashedPassword: false,
        name: true,
        assignedIssues: true,
        email: true,
        id: true,
        image: true,
      },
    })) || [];
  return NextResponse.json(users);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { email, password, name } = body;
  const validationResult = userRegistrationSchema.safeParse(body);
  if (!validationResult.success)
    return NextResponse.json(validationResult.error.errors, { status: 400 });
  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (isUserExist)
    return NextResponse.json({ error: "User already exist" }, { status: 400 });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { email, hashedPassword, name },
  });
  return NextResponse.json({ email, name }, { status: 201 });
};
