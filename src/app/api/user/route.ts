// import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

export const GET = () =>
  prisma.user
    .findMany()
    .then((users) => NextResponse.json(users))
    .catch((error) => {
      return NextResponse.json(
        {
          error,
        },
        { status: 500 }
      );
    });
