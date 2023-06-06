// import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { BookmarkPayload } from "@/model";
import { NextResponse } from "next/server";

export const GET = () =>
  prisma.bookmark
    .findMany()
    .then((bookmarks) => NextResponse.json(bookmarks))
    .catch((error) => {
      return NextResponse.json(
        {
          error,
        },
        { status: 500 }
      );
    });

export const POST = async (request: Request) => {
  const payload: BookmarkPayload = await request.json();
  const { word, description, createdBy, usageExamples } = payload;
  return prisma.bookmark
    .create({
      data: {
        word,
        description,
        createdBy,
        usageExamples: usageExamples && {
          create: usageExamples.map((example) => ({
            sentence: example,
          })),
        },
      },
    })
    .then((bookmarks) => NextResponse.json(bookmarks))
    .catch((error) => {
      return NextResponse.json(
        {
          error,
        },
        { status: 500 }
      );
    });
};
