import { BookmarkType } from "@prisma/client";

export const BOOKMARK_COLORS = {
  WORD: "#2db7f5",
  TERMINOLOGY: "#108ee9",
  SLANG: "#87d068",
  PROVERB: "#f50",
} satisfies Record<BookmarkType, string>;
