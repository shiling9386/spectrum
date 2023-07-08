import { BookmarkType } from "@prisma/client";

export const BOOKMARK_COLORS = {
  WORD: "#29c2b3",
  TERMINOLOGY: "#FFE4A7",
  SLANG: "#FF9EAA",
  PROVERB: "#F29727",
} satisfies Record<BookmarkType, string>;
