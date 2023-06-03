import { Bookmark } from "@prisma/client";

export type BookmarkPayload = Pick<Bookmark, "word" | "description" | "createdBy"> & {
  createdAt?: Date;
};
