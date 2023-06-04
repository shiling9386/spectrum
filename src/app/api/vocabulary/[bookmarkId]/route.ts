import { prisma } from "@/db";
import { NextResponse } from "next/server";

interface Params {
  params: {
    bookmarkId: string;
  };
}
export const GET = async (_request: Request, { params: { bookmarkId } }: Params) => {
  return prisma.bookmark
    .findFirst({
      where: {
        id: Number(bookmarkId),
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

export const DELETE = async (_request: Request, { params: { bookmarkId } }: Params) => {
  return prisma.bookmark
    .deleteMany({
      where: {
        id: Number(bookmarkId),
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
