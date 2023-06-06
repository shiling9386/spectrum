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
  const deleteAllUsageExamplesByBookmarkId = (bookmarkId: string) =>
    prisma.usageExample.deleteMany({
      where: {
        bookmarkId: Number(bookmarkId),
      },
    });
  const deleteUser = (bookmarkId: string) =>
    prisma.bookmark.delete({
      where: {
        id: Number(bookmarkId),
      },
    });
  return await prisma
    .$transaction([deleteUser(bookmarkId), deleteAllUsageExamplesByBookmarkId(bookmarkId)])
    .then((x) => NextResponse.json(x));
};
