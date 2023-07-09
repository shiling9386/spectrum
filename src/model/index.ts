import { Bookmark, UsageExample } from "@prisma/client";

export type SentenceExamplePayload = Pick<UsageExample, "bookmarkId" | "sentence">;
export type BookmarkPayload = Pick<Bookmark, "word" | "description" | "createdBy" | "type"> & {
  createdAt?: Date;
  usageExamples?: string[];
};
export interface BookmarkSelect extends Omit<Bookmark, "createdAt" | "updatedAt"> {
  usageExamples: UsageExample[];
  createdAt: string;
  updatedAt: string;
}
