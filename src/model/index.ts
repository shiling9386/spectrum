import { Bookmark, UsageExample } from "@prisma/client";

export type SentenceExamplePayload = Pick<UsageExample, "bookmarkId" | "sentence">;
export type BookmarkPayload = Pick<Bookmark, "word" | "description" | "createdBy"> & {
  createdAt?: Date;
  usageExamples?: string[];
};
